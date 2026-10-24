---
name: brain-carry
description: Set up or maintain a portable personal AI profile and shared Markdown knowledge vault across assistants and devices, including evidence-backed contributions, onboarding and optional Obsidian/Engram transport. Use for durable shared context rather than a one-off summary or ordinary source-code task.
license: MIT
---

# BrainCarry

Build continuity around a user-controlled knowledge store. The skill contains no user's profile. Keep a public copy of this skill separate from every filled-in private vault.

## Scope and state

Establish the intended vault location, existing files, authorized personal content and chosen access mode. Inspect existing agent instructions and navigation before editing. Use the user's requested writable location; do not assume an OS drive or a particular cloud provider.

Distinguish four states: files initialized, service connected, read/write verified, and cross-device verified. Report only the state demonstrated. Installing a plugin or opening a repository does not establish synchronization.

Use local Markdown by default. Create no scheduler, daemon, polling loop, automatic commit or automatic push. Git publication or backup requires an explicit request for that action. A request to save context is not permission to publish a personal archive.

## Route by task

- **New empty vault:** use the templates in `assets/vault-template/`. Preview with `python scripts/bootstrap_vault.py --target <absolute-path> --dry-run`, then initialize and validate. Scripts resolve resources relative to the skill, not the caller's working directory.
- **Existing profile/vault:** read [architecture](references/architecture.md). Preserve canonical paths, source dates and unrelated notes. Preview an additive integration; do not run the initializer over a nonempty vault or replace the user's taxonomy wholesale.
- **Connect another client or device:** read [transports](references/transports.md). Respect the selected provider. Use available first-party or connected tools, complete user-owned authentication through its normal flow, and verify a unique two-way marker. Do not copy tokens between clients.
- **Ingest or contribute:** read [contributions](references/contributions.md). Reread the target, distinguish facts from interpretation, preserve evidence and use unique inbox proposals if writer ownership is unclear.
- **Prepare a public release:** read [public release](references/public-release.md). Use only generic instructions, empty templates and synthetic fixtures; never bootstrap a public skill by copying a private vault.

## Shared operating rules

Keep a short index and AI brief; load only relevant project notes. Preserve raw source records separately from changing synthesis. Retain source date, observation date and uncertainty. Update the index when navigation changes and append meaningful ingests, decisions and repairs to the log.

Configure a startup instruction in each supported client. An assistant without tool access can receive a deliberate snapshot; it cannot read or write a live vault merely because instructions mention it. Ordinary conversation does not automatically become durable memory.

One canonical page has one semantic writer at a time. Cloud agents cannot rely on a local lock file; use an inbox proposal when concurrent editing is possible. Text convergence or a later timestamp does not establish which claim is correct.

Keep secrets, employer records and private archives outside the shared scope. Git ignore rules and service-specific exclusion rules are independent. Check both before first upload. Never present a heuristic privacy scan as a guarantee.

## Completion evidence

Run `scripts/validate_vault.py --vault <path>` for local structural checks. When connecting a service, also verify the selected vault, exclusions in the running client and an actual round trip. Check supported file types separately from notes. A cloud endpoint can be used while a desktop is off; a local server cannot. Backup behavior depends on its actual host and policy.

Report changed files, actual connection state, validation results and remaining client setup. If only Markdown/MCP tools are available, do not claim local scripts, application settings or structured data were updated.
