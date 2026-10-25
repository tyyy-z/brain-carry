# BrainCarry

**Models change. Your context stays.**

A cloud-first, Markdown-based Agent Skill for a personal AI profile and shared Second Brain across assistants, sessions and devices. **Recommended: Engram Cloud + Obsidian for everyday sync; GitHub only for optional manual backup.** Local-only Markdown remains supported.

Keep your context somewhere you control. Let authorized assistants read and contribute through an explicit workflow. Switch models without rebuilding the useful parts of your background from scratch.

## Recommended everyday workflow

```text
                  Engram Cloud · shared notes
                  (authorized read / write)
                             ↕
         ┌───────────────────┼───────────────────┐
         ↕                   ↕                   ↕
  ChatGPT / Claude      Other AI agents      Obsidian devices
  with Engram access    with Engram access    Windows / Mac / phone
                                                  |
                                                  └── optional manual Git backup
```

An authorized assistant updates the **shared cloud note**, not a file on one particular laptop. Another connected assistant can fetch that latest note on its next retrieval, even if the computer is off. Obsidian synchronizes supported notes when its client runs. This **does not** update another model's built-in memory or push context into an already-running conversation. Each client needs its own connection and explicit retrieval behavior.

The Skill provides governance and setup instructions, **not** a hosted sync service; Engram is an optional external service and must be connected with user approval. Mobile and non-Markdown formats require their own verification.

## What it provides

- A compact profile, preferences and current-work entry point.
- Raw evidence, linked synthesis, an inbox and an append-only change log.
- Rules for multiple agents to contribute without silently overwriting each other.
- A **recommended cloud-first Engram/Obsidian workflow** with per-client onboarding and actual read/write verification; local-only operation stays available.
- A local-only vault initializer, link validator and public-release checks.
- Manual Git backup guidance. No scheduled jobs, polling, automatic commits or automatic pushes.

This repository contains generic instructions, empty templates and synthetic tests. It contains no creator biography, personal vault export, private repository address or account credentials.

## Quick start

Download the ZIP from this repository's Releases page, or download/clone the source. Extract it and copy the entire `brain-carry/` folder into a supported skill location.

The skill lives in [`brain-carry/`](brain-carry/SKILL.md). Copy that entire directory into a skill location supported by your assistant, or ask an assistant with file access to read its `SKILL.md`. Installation and automatic discovery vary by client; copying a folder does not connect any account.

Invoke it with a request such as:

> Use $brain-carry to create a personal AI profile and shared knowledge vault. Start with empty templates, preserve my existing notes, and configure no external service or automatic backup unless I request it.

To create a new local vault without an agent, run these commands from this repository root, replacing `/path/to/new-vault` with your chosen location:

```text
python brain-carry/scripts/bootstrap_vault.py --target /path/to/new-vault --dry-run
python brain-carry/scripts/bootstrap_vault.py --target /path/to/new-vault
python brain-carry/scripts/validate_vault.py --vault /path/to/new-vault
```

Python 3.10+; standard library only. On Windows, use an absolute Windows path. The initializer refuses nonempty destinations and never imports your chat history or existing profile. For an existing vault, follow the additive integration procedure in the skill instead of running the initializer over it.

## Choose the sharing model

| Mode | What works | What you configure |
| --- | --- | --- |
| **Shared cloud notes (recommended)** | Authorized agents retrieve and edit the same cloud knowledge without keeping a personal computer online; Obsidian is a synced human interface | Explicit service authorization, cloud vault selection, per-client credentials, mobile plugin when supported, read/write tests |
| Local Markdown (offline fallback) | An assistant with filesystem access reads and edits notes, but its computer must be available for that access | A local folder and client instructions |
| Manual snapshot | A client reads an explicitly supplied brief | Export or paste only the relevant context |
| Optional Git backup | Version history and recovery | A private destination and a user-requested commit/push |

The skill is portable guidance, not a sync server. Engram is optional. Every assistant needs its own authorized access, supported tools and startup instruction. No claim of universal client compatibility or automatic account-level memory synchronization is made.

When a remote cloud connection is available, a phone assistant can work with cloud notes while a computer is off. The desktop vault catches up when its sync application runs again. A local-only MCP server instead needs its host online. Phone client access must be tested separately.

## How contributions work

Read the index and current page, preserve dated evidence, update the relevant synthesis, and record meaningful changes. If another agent may be editing the same page, write a unique proposal into `inbox/`. A designated editor merges proposals; CRDT text convergence alone does not resolve contradictory claims.

Start each connected client with:

> Read AGENTS.md, index.md, AI_BRIEF.md and PREFERENCES.md from my selected vault. Read NOW.md when continuing work. Follow Workflows.md for contributions and SYNC_SETUP.md for transport boundaries. Use a unique inbox proposal when page ownership is unclear. Do not configure background jobs or push to GitHub unless I explicitly request it.

## Boundaries

- Connecting a tool does not automatically save every conversation or load every note.
- A public skill repository and a private personal vault are separate artifacts. Never publish a filled-in personal vault as a skill update.
- `.gitignore` affects Git; each sync service needs its own exclusion settings.
- Do not run two independent bidirectional sync systems against the same live vault.
- Shell scripts, arbitrary JSON and local application settings may not be supported by a notes sync provider. Verify formats before promising parity.
- Checks detect selected problems; they do not establish factual accuracy or guarantee that no personal information remains.

## Development and public release

Run from the repository root:

```text
python tests/test_braincarry.py
python brain-carry/scripts/check_release.py --root .
```

`--forbid-text` can add project-specific phrases to the release check; do not pass actual credentials as command-line arguments. Inspect the release manifest and content manually before publishing. Test artifacts belong in `.local/`, which is excluded from release packaging and Git.

Create a clean, explicit release archive when requested:

```text
python brain-carry/scripts/package_release.py --root . --output .local/brain-carry.zip
```

This command packages only the public allowlist after validation. It does not publish or upload anything. GitHub publication is a separate, explicitly requested action; these tools never configure a remote or push.

See [contributing](CONTRIBUTING.md) and [launch copy](docs/launch-copy.md).

## Credits

The raw-source / maintained-wiki approach is inspired by [Andrej Karpathy's LLM Wiki note](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). This is an independent implementation, not an official Karpathy, Obsidian, Engram or model-provider product. Optional Engram behavior should be checked against its [official user guide](https://github.com/engram-app/Engram-obsidian/blob/main/docs/user-guide.md).

MIT licensed. v0.1.0 is the initial published release; cloud-first documentation updates on main do not constitute a new GitHub Release. Local initialization and synthetic filesystem checks were exercised on Windows; live compatibility with every assistant, mobile client or cloud setup is not implied.
