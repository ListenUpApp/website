+++
title = "Configuration"
weight = 10
description = "Every ListenUp environment variable: core, secrets, registration, scanner, and logging. Build a ready-to-run config."
[params]
eyebrow = "Server Setup"
lede = "ListenUp is configured entirely through environment variables, and everything has a sensible default. Toggle the settings you want and copy a ready-to-run config."
+++

> [!NOTE]
> A bare install runs with nothing set. Set variables however you run the server: `docker run -e`, a Compose `environment:` block, a systemd unit, or your shell. **Secrets are the exception:** leave them unset and ListenUp generates secure values on first boot.

## Config builder

Flip a switch to include a variable, set its value, and your config assembles live. Switch between **Compose**, `docker run`, and `.env` formats, and click any variable name to copy it.

{{< config-builder >}}


> [!WARNING]
> Secrets generate in your browser for convenience, but you rarely need to set them. Leaving `LISTENUP_JWT_SECRET` and `LISTENUP_REFRESH_PEPPER` unset lets ListenUp create and persist them to `secrets.properties`. **Back up that file:** lose the JWT secret and everyone is logged out; rotate the pepper and everyone must sign in again.

## A few specifics worth knowing

- **It's `PORT`, not `LISTENUP_PORT`.** The HTTP port is the one unprefixed variable.
- **Paths must be absolute.** `LISTENUP_HOME` reads `~` literally (it isn't shell-expanded), so write the full path.
- **Durations are Kotlin [`Duration` strings](https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.time/-duration/)** like `6h` or `30m`. `0` disables the periodic rescan while the live file watcher keeps running.
- **Invalid values fail fast.** A bad `LISTENUP_METADATA_PRECEDENCE` token, or a JWT secret under 32 bytes, stops startup rather than running misconfigured.
