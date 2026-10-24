# Transports and client onboarding

## Select one live transport

For local-only use, give a supported assistant access to the chosen Markdown folder. For shared notes, choose a remote service and connect each client explicitly. Prefer available connected tools; do not invent API endpoints or tools.

Git is optional history/backup. Default: manual only. Do not set up periodic jobs or auto-push. If requested, verify the destination and visibility, review the file scope and normal push result. Never force-push or silently pull remote edits into an active sync directory. A stopped host cannot run a local backup.

Use a single live bidirectional notes transport for a vault. Adding Git pull, iCloud or another sync service over the same files creates independent writers and needs a separate design, not an assumption of harmless redundancy.

## Optional Engram with Obsidian

Verify the current [official user guide](https://github.com/engram-app/Engram-obsidian/blob/main/docs/user-guide.md) and release before installation; product behavior can change. The hosted MCP endpoint is documented as `https://mcp.engram.page`. Other providers or self-hosting require their own checked configuration.

1. Inventory the user's selected remote vault and local folder independently. Never copy an example vault ID. Record the actual selected ID/name in the private vault's SYNC_SETUP.md.
2. Install a reviewed official plugin release only within the requested vault; if release digests are supplied, verify them. Preserve existing plugin settings and other enabled plugins.
3. Complete OAuth in each client through its normal user flow. Do not read, print, commit or share tokens. A connection in one product is not evidence that a phone or another assistant is connected.
4. Configure exclusions in the running plugin before first upload; inspect the actual sync preview. Stop if the preview includes private scope or a mass replacement/deletion you did not intend.
5. In Engram versions inspected during development, ignore rules are literal prefixes/suffixes, one per line, not glob patterns. Settings persisted under a `settings` object inside plugin data; a flat preseed file was not sufficient. Check the current schema and UI, then verify the live engine rather than trusting an edited config file. Preserve authentication and sync state if modifying settings through an authorized client API.
6. Check file formats: the documented plugin supports Markdown, Canvas and selected attachments; it does not carry arbitrary scripts, JSON or `.obsidian` settings. Configure each device locally. Do not transfer plugin credentials to approximate config sync.

An example starting exclusion set, adapted to the actual user's folder structure:

```text
.obsidian/
.git/
.trash/
sensitive/
generated/
local/
journal/
```

Attachments are a user scope decision. Keep private attachments excluded; if approved shared assets use a dedicated folder. Do not treat `.gitignore` as a cloud exclusion mechanism. If a client converts newline-separated patterns into one space-separated string, fix it in the running client and verify each private path is excluded while a shared note remains allowed.

## Per-client startup instruction

Tell each client the selected private vault identifier and ask it to read AGENTS.md, index.md, AI_BRIEF.md, PREFERENCES.md and relevant current work. The client must have the required tools and permissions. Do not promise automatic discovery, automatic note saving or write support in an untested mobile surface.

## Acceptance test

Use a uniquely named, nonsensitive note. Create a local marker and read it through the remote tool. Add a different marker remotely and verify it reaches the local file. On each additional device verify a read and a write. Check the running client's selected vault, errors and exclusions. Record timestamps and which directions actually passed. Keep installation, cloud availability and device verification separate.

A remote cloud service does not require a desktop to remain on. Desktop files catch up when the app runs. A local MCP process or self-hosted service requires its own host online. Voice mode and mobile tool availability are client-specific and require their own test.

## Recovery

Pause affected writers, preserve current versions, compare in a separate checkout/folder, and restore only selected notes. A conflict copy identical after line-ending normalization can be archived then removed after verification. A substantive difference needs review. Never bulk-delete notes just because a connection inventory is temporarily empty.
