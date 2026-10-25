# Transports and client onboarding

## Recommended flow: cloud-editable personal AI profile

1. Ask the user which knowledge may enter a shared cloud vault; do not silently import private chats or sensitive files. If they approve Engram, connect the **existing** selected cloud vault when available; do not create competing vaults.
2. Create or reconcile the minimal Markdown knowledge structure in the shared vault using the authorized cloud connector. Obsidian is an optional human-facing synced client, not a mandatory host for cloud edits.
3. Onboard each AI client independently through authorized MCP/provider access. Configure startup instructions to read `AGENTS.md`, `index.md`, `AI_BRIEF.md` and relevant current/project notes from the specified vault. Explicitly retrieve again when checking for updates.
4. Verify agent A writes a uniquely named nonsensitive test note; agent B reads the changed content **from the cloud**, and (where installed) Obsidian also receives it. Verify reverse writes and each phone/desktop independently. A document listing is not evidence of content sync; check actual bytes/contents and renderability for Canvas/attachments.
5. Keep GitHub as optional **user-requested manual backup**, preferably after a synchronized desktop checkout is reconciled and validated. Never make GitHub or a powered-on laptop the required live path.

## Select one live transport

For the recommended cloud-first mode, use the user's explicitly authorized remote vault so agents can access it without relying on a powered-on desktop. For local-only fallback, give a supported assistant access to the chosen Markdown folder. Connect each cloud client explicitly. Prefer available connected tools; do not invent API endpoints or tools.

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

## Canvas and non-Markdown verification

A note's presence or filename is not enough. For each supported format, separately verify cloud content, locally received content and application display. In particular, a `.canvas` file can appear in an Obsidian vault yet contain only an empty node array locally; do not mark it synced on filename presence alone. Record sizes, parseability and node count for Canvas; use format-specific checks for attachments. Preserve working originals and avoid overwriting them from an empty remote copy.

## Acceptance test

Use a uniquely named, nonsensitive note. Create a local marker and read it through the remote tool. Add a different marker remotely and verify it reaches the local file. On each additional device verify a read and a write. Check the running client's selected vault, errors and exclusions. Record timestamps and which directions actually passed. Keep installation, cloud availability and device verification separate.

A remote cloud service does not require a desktop to remain on. Desktop files catch up when the app runs. A local MCP process or self-hosted service requires its own host online. Voice mode and mobile tool availability are client-specific and require their own test.

## Recovery

Pause affected writers, preserve current versions, compare in a separate checkout/folder, and restore only selected notes. A conflict copy identical after line-ending normalization can be archived then removed after verification. A substantive difference needs review. Never bulk-delete notes just because a connection inventory is temporarily empty.
