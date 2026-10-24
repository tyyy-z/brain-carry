"""Check public file scope, selected credential formats and supplied private phrases."""
from pathlib import Path
import argparse
import json
from release_common import inspect_release


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', required=True)
    parser.add_argument('--forbid-text', action='append', default=[])
    args = parser.parse_args()
    root = Path(args.root).resolve()
    files, errors = inspect_release(root, args.forbid_text)
    print(json.dumps({'ok': not errors, 'public_files': [p.relative_to(root).as_posix() for p in files],
                      'errors': errors, 'privacy_guaranteed': False}, indent=2))
    return 1 if errors else 0


if __name__ == '__main__':
    raise SystemExit(main())
