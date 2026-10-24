# Contributing to BrainCarry

Improve a workflow, fix a demonstrated failure, or add a synthetic test. Keep runtime vault contents outside the public package. Do not submit personal profiles, account identifiers, screenshots of private notes, API credentials or employer information.

For a new transport, document storage direction, supported formats, authentication ownership, exclusions, conflict handling, offline behavior and a reproducible read/write acceptance test. A docs-only adapter is acceptable; do not imply it has been live-tested.

Preserve manual Git and no-background-job defaults. A skill invocation is not blanket authorization to upload notes, connect a service or publish a repository. Avoid mandatory dependencies when local Markdown is sufficient.

Run `python tests/test_braincarry.py` and `python brain-carry/scripts/check_release.py --root .`. The package allowlist is maintained by `scripts/release_common.py` inside the skill; update it deliberately if adding a public file type or directory. Do not add generated test results to commits.

Documentation changes should preserve the distinction between initialized, connected, verified, proposed and completed. Report which operating systems and actual clients you tested.
