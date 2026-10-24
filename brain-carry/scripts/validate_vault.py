"""Read-only structural checks; does not establish facts or verify synchronization."""
from pathlib import Path
from urllib.parse import unquote
import argparse
import json
import re

SKIP = {'.git', '.obsidian', '.trash', 'local', 'sensitive', 'generated', 'journal', 'attachments'}
CORE = ('index.md', 'AGENTS.md', 'Workflows.md', 'SYNC_SETUP.md', 'log.md')


def link_errors(root, paths):
    root = Path(root).resolve()
    errors, links = [], 0
    stems = {}
    for path in paths:
        stems.setdefault(path.stem, []).append(path)
    for path in paths:
        if path.is_symlink():
            errors.append(f'Symbolic link: {path.relative_to(root)}')
            continue
        try:
            text = path.read_text(encoding='utf-8')
        except (OSError, UnicodeError):
            errors.append(f'Unreadable UTF-8: {path.relative_to(root)}')
            continue
        # Tutorial code is not a set of live document links.
        text = re.sub(r'```.*?```|~~~.*?~~~', '', text, flags=re.S)
        for raw in re.findall(r'\]\(([^)]+)\)', text):
            raw = raw.strip().strip('<>')
            if re.match(r'^[a-z][a-z0-9+.-]*:', raw, re.I) or raw.startswith('#'):
                continue
            dest = (path.parent / unquote(raw.split('#')[0])).resolve()
            if not dest.is_relative_to(root) or not dest.exists():
                errors.append(f'Broken or escaping link: {path.relative_to(root)} -> {raw}')
            links += 1
        for raw in re.findall(r'\[\[([^\]]+)\]\]', text):
            target = unquote(raw.split('|')[0].split('#')[0])
            if not target:
                continue
            candidates = [(path.parent/target).resolve(), (root/target).resolve()]
            candidates += [p.with_suffix('.md') for p in candidates if not p.suffix]
            direct = any(p.is_relative_to(root) and p.is_file() for p in candidates)
            basename = Path(target).stem
            if not direct and ('/' in target or '\\' in target or len(stems.get(basename, [])) != 1):
                errors.append(f'Broken or ambiguous wiki link: {path.relative_to(root)} -> {target}')
            links += 1
    return errors, links


def validate(root):
    root = Path(root).resolve()
    if not root.is_dir():
        return {'ok': False, 'errors': ['Vault directory does not exist']}
    paths = sorted(p for p in root.rglob('*.md')
                   if not any(x in SKIP for x in p.relative_to(root).parts))
    errors = [f'Missing core entry: {name}' for name in CORE if not (root/name).is_file()]
    found, links = link_errors(root, paths)
    errors.extend(found)
    return {'ok': not errors, 'markdown_files': len(paths), 'links_checked': links,
            'errors': errors, 'network_verified': False, 'factual_accuracy_verified': False}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--vault', required=True)
    args = parser.parse_args()
    result = validate(args.vault)
    print(json.dumps(result, indent=2))
    return 0 if result['ok'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
