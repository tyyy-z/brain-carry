"""Shared public allowlist and release checks. No uploads or Git operations."""
from pathlib import Path
import re
from validate_vault import link_errors

SKIP = {'.git', '.local', '__pycache__'}
ROOT_FILES = {'README.md', 'LICENSE', '.gitignore', 'CONTRIBUTING.md'}
PATTERNS = {
    'GitHub-style token': re.compile(r'gh[pousr]_[A-Za-z0-9]{30,}'),
    'Private key header': re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
    'API-key-like value': re.compile(r'sk-(?:proj-)?[A-Za-z0-9_-]{40,}'),
}


def allowed(relative):
    parts = relative.parts
    if len(parts) == 1:
        return relative.name in ROOT_FILES
    if parts[0] == 'docs':
        return relative.suffix == '.md'
    if parts[0] == 'tests':
        return relative.suffix == '.py'
    if parts[0] != 'brain-carry':
        return False
    if len(parts) == 2:
        return parts[1] == 'SKILL.md'
    if parts[1] == 'agents':
        return relative.as_posix() == 'brain-carry/agents/openai.yaml'
    if parts[1] == 'references':
        return relative.suffix == '.md'
    if parts[1] == 'scripts':
        return relative.suffix == '.py'
    if parts[1:3] == ('assets', 'vault-template'):
        return relative.suffix == '.md' or relative.name == '.gitignore'
    return False


def inspect_release(root, forbidden=()):
    root = Path(root).resolve()
    errors, files = [], []
    if not root.is_dir():
        return [], ['Release directory does not exist']
    for path in sorted(root.rglob('*')):
        rel = path.relative_to(root)
        # Never follow links, even if their name otherwise looks local/ignored.
        if path.is_symlink():
            errors.append(f'Symbolic link must not be packaged: {rel.as_posix()}')
            continue
        if any(part in SKIP for part in rel.parts) or path.is_dir():
            continue
        if not allowed(rel):
            errors.append(f'Unexpected public file: {rel.as_posix()}')
            continue
        files.append(path)
        try:
            text = path.read_text(encoding='utf-8')
        except (OSError, UnicodeError):
            errors.append(f'Unreadable UTF-8 file: {rel.as_posix()}')
            continue
        for label, pattern in PATTERNS.items():
            if pattern.search(text):
                errors.append(f'{label} detected in {rel.as_posix()}; inspect privately')
        if any(phrase.casefold() in text.casefold() for phrase in forbidden if phrase):
            errors.append(f'Configured forbidden text detected in {rel.as_posix()}')
    for required in (*ROOT_FILES, 'brain-carry/SKILL.md'):
        if not (root/required).is_file():
            errors.append(f'Missing public entry: {required}')
    md = [p for p in files if p.suffix == '.md']
    link_problems, _ = link_errors(root, md)
    errors.extend(link_problems)
    return files, errors
