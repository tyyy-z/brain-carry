# BrainCarry launch kit

## Name and positioning

Name: **BrainCarry**. Skill ID: `brain-carry`. Suggested repository name: `brain-carry`.

Tagline: **Models change. Your context stays.**

Description: A Markdown-first Agent Skill for portable personal context and a shared Second Brain, with explicit contribution rules and optional Obsidian/Engram connectivity.

The distinction is continuity of user-controlled context, not preservation of a model's identity, weights or consciousness. Knowledge should still evolve as the user changes and new evidence arrives. The name is a working release name, not a claim of trademark clearance.

## Short post

Every new model should not mean introducing yourself from scratch.

BrainCarry keeps your AI profile, current projects and useful knowledge in a Markdown vault you control. Authorized assistants can read it and contribute through a shared workflow. Obsidian for editing; optional Engram for cloud access; Git only when you ask.

Models change. Your context stays.

## Longer launch post

I built BrainCarry for a recurring problem: useful context keeps getting trapped in separate chats and assistants.

It is an Agent Skill and a small set of Markdown templates and local tools. You keep a profile and current-work brief, preserve raw evidence, and let assistants maintain linked synthesis. Multiple agents use explicit contribution rules instead of blindly replacing the same page.

You can start with local files. An optional Engram/Obsidian setup lets authorized clients share cloud notes across devices. Each client still needs access and a real read/write test. There is no automatic chat harvesting, no background scheduler, and no automatic GitHub push.

The public package contains generic templates and synthetic tests, not a personal profile. I would like feedback on onboarding friction, conflict handling and which client integrations people actually verify.

## Demo plan

1. Initialize an empty demo vault, using only synthetic facts.
2. Ask agent A to record a fictional project constraint with its source.
3. Ask agent B to load the brief and propose a change in a unique inbox note.
4. Merge the proposal, link its evidence and inspect the log.
5. If a cloud adapter is connected, demonstrate an actual round trip. Otherwise label the transport diagram as a proposed setup.

Before a public demo, inspect the screen for account names, paths, notifications, tokens and unrelated vault tabs. Record a synthetic environment, not a personal vault.

## Publishing checklist

Run the tests and release checker; inspect the archive manifest; choose the public repository destination; publish only after an explicit request. Add the actual repository URL to the post after it exists. Do not fabricate downloads, stars, user counts, benchmarks or client endorsements.

Suggested channels: a GitHub README and release, a short X post, and a community post where project-sharing rules allow it. No posts or messages are sent by this kit.
