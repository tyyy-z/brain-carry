"""Synthetic filesystem tests; all temporary output stays under this repo's .local/."""
from pathlib import Path
import json
import subprocess
import sys
import tempfile
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT/'brain-carry/scripts'
sys.path.insert(0, str(SCRIPTS))
from bootstrap_vault import initialize
from validate_vault import validate
from release_common import inspect_release
from package_release import package


class BrainCarryTest(unittest.TestCase):
    def setUp(self):
        tmp_root = ROOT/'.local/test-runs'
        tmp_root.mkdir(parents=True, exist_ok=True)
        self.tmp = tempfile.TemporaryDirectory(prefix='synthetic-', dir=tmp_root)
        self.base = Path(self.tmp.name)

    def tearDown(self):
        self.tmp.cleanup()

    def minimal_release(self):
        root = self.base/'release'
        root.mkdir()
        for name in ('README.md','LICENSE','.gitignore','CONTRIBUTING.md'):
            (root/name).write_text('Synthetic public text\n', encoding='utf-8')
        (root/'brain-carry').mkdir()
        (root/'brain-carry/SKILL.md').write_text('# Synthetic skill\n', encoding='utf-8')
        return root

    def test_cli_dry_run_has_no_filesystem_side_effect(self):
        target = self.base/'vault with spaces'
        result = subprocess.run([sys.executable, str(SCRIPTS/'bootstrap_vault.py'),
                                 '--target', str(target), '--dry-run'],
                                capture_output=True, text=True, check=True)
        self.assertEqual(json.loads(result.stdout)['status'], 'dry_run')
        self.assertFalse(target.exists())

    def test_empty_vault_initializes_and_validates(self):
        target = self.base/'new vault'
        result = initialize(target)
        self.assertFalse(result['background_jobs_created'])
        self.assertFalse(result['network_used'])
        self.assertTrue(validate(target)['ok'])
        self.assertFalse((target/'.git').exists())
        self.assertIn('No personal facts recorded', (target/'PROFILE.md').read_text())

    def test_existing_vault_is_not_overwritten(self):
        target = self.base/'existing'
        target.mkdir()
        sentinel = target/'index.md'
        sentinel.write_bytes(b'Keep this original work\n')
        with self.assertRaises(ValueError):
            initialize(target)
        self.assertEqual(sentinel.read_bytes(), b'Keep this original work\n')
        self.assertEqual([p.name for p in target.iterdir()], ['index.md'])

    def test_vault_rejects_escaping_links_even_when_target_exists(self):
        target = self.base/'vault'
        initialize(target)
        (self.base/'outside.md').write_text('Synthetic private file\n')
        (target/'index.md').write_text('[escape](../outside.md)\n')
        result = validate(target)
        self.assertFalse(result['ok'])
        self.assertTrue(any('escaping link' in error for error in result['errors']))

    def test_broken_link_is_reported(self):
        target = self.base/'vault'
        initialize(target)
        with (target/'index.md').open('a') as out:
            out.write('\n[missing](missing.md)\n')
        self.assertFalse(validate(target)['ok'])

    def test_release_rejects_unexpected_private_vault(self):
        root = self.minimal_release()
        (root/'personal-vault').mkdir()
        (root/'personal-vault/PROFILE.md').write_text('Synthetic profile\n')
        _, errors = inspect_release(root)
        self.assertTrue(any('Unexpected public file' in error for error in errors))

    def test_release_detects_selected_credentials_without_printing_value(self):
        root = self.minimal_release()
        fake = ('gh'+'p_') + 'Z'*36
        (root/'README.md').write_text(fake)
        _, errors = inspect_release(root)
        self.assertTrue(any('token' in error for error in errors))
        self.assertTrue(all(fake not in error for error in errors))

    def test_configured_private_phrase_blocks_release(self):
        root = self.minimal_release()
        (root/'README.md').write_text('Synthetic Person Alpha\n')
        _, errors = inspect_release(root, ['person alpha'])
        self.assertTrue(any('forbidden text' in error for error in errors))

    def test_release_archive_excludes_local_runtime(self):
        root = self.minimal_release()
        (root/'.local').mkdir()
        (root/'.local/account.json').write_text('Synthetic local runtime\n')
        output = root/'.local/release.zip'
        result = package(root, output)
        self.assertFalse(result['published'])
        with zipfile.ZipFile(output) as archive:
            self.assertEqual(len(archive.namelist()), 5)
            self.assertFalse(any('.local' in name for name in archive.namelist()))
        with self.assertRaises(ValueError):
            package(root, output)


if __name__ == '__main__':
    unittest.main(verbosity=2)
