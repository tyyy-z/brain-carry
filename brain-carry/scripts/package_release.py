"""Create an explicit, validated local public archive; never publish or upload."""
from pathlib import Path
import argparse
import hashlib
import json
import zipfile
from release_common import inspect_release


def package(root, output):
    root, output = Path(root).resolve(), Path(output).resolve()
    if output.is_relative_to(root) and output.relative_to(root).parts[0] != '.local':
        raise ValueError('Place release output outside the public tree or under .local/')
    if output.exists():
        raise ValueError('Refusing to overwrite an existing release archive')
    files, errors = inspect_release(root)
    if errors:
        raise ValueError('\n'.join(errors))
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, 'x', compression=zipfile.ZIP_DEFLATED) as archive:
        for path in files:
            info = zipfile.ZipInfo(path.relative_to(root).as_posix(), (1980,1,1,0,0,0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes())
    return {'files': len(files), 'bytes': output.stat().st_size,
            'sha256': hashlib.sha256(output.read_bytes()).hexdigest(), 'published': False}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', required=True)
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    try:
        print(json.dumps(package(args.root, args.output), indent=2))
    except (ValueError, OSError) as exc:
        parser.exit(1, str(exc)+'\n')


if __name__ == '__main__':
    main()
