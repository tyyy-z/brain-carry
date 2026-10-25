# Access and sync setup

Current mode: **unconnected starter vault**. Recommended target mode: **Engram shared cloud notes + Obsidian sync**, with GitHub only as an optional, user-requested manual backup. Initialization alone does not create cloud access, an account, a plugin connection or a backup.

## Cloud-first onboarding checklist

- [ ] User explicitly approves which existing/new notes may be uploaded to the selected cloud provider.
- [ ] Record exact Engram vault name/ID privately in this file; connect each authorized AI client independently.
- [ ] Verify agent-to-cloud write and a separate agent-to-cloud read of changed content.
- [ ] Connect Obsidian desktop/phone individually and verify both sync directions; offline devices catch up when their app runs.
- [ ] Separately verify non-Markdown formats (Canvas, attachments) by actual content and display, not only filenames.
- [ ] Only if user asks: manually reconcile and back up approved files to private GitHub; no schedule or auto-push.

## Before sharing

Record the chosen provider, actual vault identifier, authorized shared scope, exclusions and connected clients here. Keep credentials in the client's supported credential store, never in notes or Git. Git ignore rules and service exclusions must be configured independently.

Select one live notes transport. Git, if requested, is manual history/backup. Do not create scheduled tasks, polling, automatic commits or automatic pushes. A local-only connection needs its host online; a connected cloud endpoint can serve notes while a desktop is off. Verify each client independently.

## Verification ledger

No tests performed yet. Record separately: local files validated, service connected, local-to-cloud passed, cloud-to-local passed, each additional device read/write passed, and any explicitly requested backup result. Installation alone proves none of these network steps.

## New client instruction

Read AGENTS.md, index.md, AI_BRIEF.md and PREFERENCES.md from the explicitly selected vault. Read NOW.md for ongoing work and follow Workflows.md. Use unique inbox proposals for concurrent work. Do not claim access or synchronization without actual tools and verification.

See [Agent instructions](AGENTS.md) and [Workflows](Workflows.md).
