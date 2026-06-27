+++
title = "Configuration"
weight = 10
description = "Every ListenUp environment variable: core, secrets, registration, scanner, and logging."
[params]
eyebrow = "Server Setup"
lede = "ListenUp is configured entirely through environment variables. Everything has a sensible default. Set only what you need to change."
+++

Every setting below has a default, so a bare install runs with nothing configured. Set variables however you run the server: `docker run -e`, a Compose `environment:` block, a systemd unit, or your shell.

Secrets are the exception worth knowing about: leave them unset and ListenUp generates secure values on first boot, persisting them to `secrets.properties` inside your data directory.

## Core & runtime

| Variable | Default | Purpose |
| --- | --- | --- |
| `LISTENUP_HOME` | `~/ListenUp` | Data directory: the SQLite database (`listenup.db`), `secrets.properties`, cover art, and the scan spool. Set it to relocate all app data. Use an **absolute path**; `~` is read by the app directly and isn't expanded by config. |
| `PORT` | `8080` | HTTP listen port. Note the variable is `PORT`, **not** `LISTENUP_PORT`. |
| `LISTENUP_SERVER_NAME` | `ListenUp` | Instance display name, shown on the public invite landing page. |
| `LISTENUP_DATA_DIR_LOCK` | `true` | Takes an exclusive OS lock on the data directory so two server processes can't share one home and race the scan spool. |

## Secrets

Both are auto-generated and persisted on first boot if unset. You normally never set them by hand.

| Variable | Default | Purpose |
| --- | --- | --- |
| `LISTENUP_JWT_SECRET` | _generated_ | HS256 signing secret, ≥ 32 bytes. If unset, a secure value is generated on first boot and persisted to `$LISTENUP_HOME/secrets.properties`. An explicit value that's the committed default, or shorter than 32 bytes, fails startup. |
| `LISTENUP_REFRESH_PEPPER` | _generated_ | HMAC-SHA-256 pepper for refresh tokens, ≥ 32 bytes. Same generate-and-persist behavior. Rotating it invalidates all stored hashes, forcing every user to re-authenticate. |

> [!WARNING]
> Because secrets are generated into `secrets.properties` inside `LISTENUP_HOME`, **back up that file** (or your whole data directory). Lose the JWT secret and everyone is logged out; rotate the refresh pepper and everyone must sign in again.

## Registration

| Variable | Default | Purpose |
| --- | --- | --- |
| `LISTENUP_REGISTRATION_POLICY` | `APPROVAL_QUEUE` | How new sign-ups are handled: `OPEN` \| `APPROVAL_QUEUE` \| `CLOSED`. |

## Scanner & library

| Variable | Default | Purpose |
| --- | --- | --- |
| `LISTENUP_LIBRARY_PATH` | _(empty)_ | Absolute folders used to seed the singleton library on first boot. Delimited by the OS path separator: `:` on Unix, `;` on Windows. |
| `LISTENUP_METADATA_PRECEDENCE` | _(default order)_ | Comma-separated, highest priority first: `metadata.json, embedded, sidecar, filename, folder`. An invalid token fails startup. |
| `LISTENUP_EMBEDDED_COVER_CACHE_SIZE` | `1000` | Maximum embedded-artwork covers held in the in-memory LRU cache. |
| `LISTENUP_SCAN_RESCAN_ON_STARTUP` | `true` | Re-walk every library once on startup. |
| `LISTENUP_SCAN_PERIODIC_RESCAN_INTERVAL` | `6h` | Periodic full-rescan backstop, as a Kotlin `Duration` (e.g. `30m`). `0` or blank disables it. The live file watcher still runs. |

## Logging

| Variable | Default | Purpose |
| --- | --- | --- |
| `LISTENUP_LOG_LEVEL` | `INFO` | Default log level. |
| `LISTENUP_LOG_LEVEL_<prefix>` | _(none)_ | Per-package override. Underscores become dots, and the longest matching prefix wins. For example, `LISTENUP_LOG_LEVEL_com_calypsan_listenup_server_scanner=DEBUG`. |

## Seed & development

| Variable | Default | Purpose |
| --- | --- | --- |
| `LISTENUP_SEED_PROFILE` | _(empty)_ | Selects a startup seed profile (demo data). Intended for development. This only sort of works right now. |
