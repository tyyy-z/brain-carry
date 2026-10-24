"""Initialize an empty, local-only BrainCarry vault without overwriting files."""
from pathlib import Path
import argparse
import json

TEMPLATE = Path(__file__).resolve().parents[1] / 'assets/vault-template'


def initialize(target, dry_run=False):
    target = Path(target).expanduser()
    if not target.is_absolute():
        raise ValueError('Choose an absolute vault path')
    # Reject links in existing ancestors, not just at the destination.
    if any(p.is_symlink() for p in [target, *target.parents]):
        raise ValueError('Choose a real directory, not a symbolic-link path')
    target = target.resolve()
    if target.parent == target:
        raise ValueError('A filesystem root cannot be a vault destination')
    if target.exists() and (not target.is_dir() or any(target.iterdir())):
        raise ValueError('Destination is not empty; use the additive integration workflow')
    sources = sorted(p for p in TEMPLATE.rglob('*') if p.is_file())
    if any(p.is_symlink() for p in TEMPLATE.rglob('*')):
        raise ValueError('Template contains a symbolic link')
    paths = [p.relative_to(TEMPLATE) for p in sources]
    if not dry_run:
        target.mkdir(parents=True, exist_ok=True)
        for source, relative in zip(sources, paths):
            dest = target / relative
            dest.parent.mkdir(parents=True, exist_ok=True)
            # Exclusive creation protects files appearing after preflight.
            with dest.open('xb') as output:
                output.write(source.read_bytes())
    return {'status': 'dry_run' if dry_run else 'initialized',
            'files': [p.as_posix() for p in paths],
            'network_used': False, 'background_jobs_created': False}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--target', required=True)
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    try:
        print(json.dumps(initialize(args.target, args.dry_run), indent=2))
    except (ValueError, OSError) as exc:
        parser.exit(1, str(exc)+'\n')


if __name__ == '__main__':
    main()
