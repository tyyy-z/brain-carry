# Preparing a public skill release

Package only generic instructions, empty templates, tools and synthetic tests. Keep every filled-in vault, local path/account identifier, runtime configuration and test output outside the public manifest. Reconstruct a generic example instead of search-and-replacing a real person's export.

Run `scripts/check_release.py --root <repository-root>`. Supply relevant personal phrases through repeated `--forbid-text` flags when useful; never pass real secrets in shell arguments. The checker inspects the entire nonlocal tree for unexpected files and symlinks, scans public files for selected credential formats, checks Markdown links and reports the public manifest. It cannot guarantee absence of personal data or recognize all credentials.

Then run the synthetic tests and inspect the content. `scripts/package_release.py` validates and archives only the explicit public allowlist. `.local/`, `.git/` and bytecode caches are omitted. Confirm the manifest contains no filled-in user profile or source dump. Do not include tests' temporary directories.

The MIT license applies to this generic implementation. Do not copy another repository's code, licensed templates, images or private records without checking their provenance and applicable permissions. Attribute methodology links and avoid implied endorsement.

Publishing and marketing are separate actions. Prepare a public README and truthful copy, but do not create a public repository, push a private profile, post messages or claim the project is live without a request. No automatic GitHub synchronization is part of this skill.
