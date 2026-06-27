+++
title = "Installation"
weight = 10
description = "Run the server with Docker in minutes"
[params]
eyebrow = "Getting Started"
lede = "Stand up your own ListenUp server in a few minutes. Docker is the recommended path on every platform — one image, two volumes, and you're streaming your library to every device."
+++

> [!NOTE]
> ListenUp is **server software you host yourself**. There's no cloud account and nothing to sign up for — you run the server, then connect the apps to it. Your files and listening history never leave your machine.

## System requirements

ListenUp is light. It happily runs on a Raspberry Pi 4, a spare laptop, or a corner of your NAS. The numbers below are comfortable minimums for a single household.

- **CPU** — any 64-bit processor (amd64 or arm64). Direct streaming uses almost nothing; transcoding is optional.
- **Memory** — 512 MB RAM minimum, 1 GB recommended once your library passes a few thousand books.
- **Storage** — space for your audiobooks, plus roughly `50 MB` for the database and cached cover art per 1,000 titles.
- **OS** — Linux, macOS, or Windows with Docker installed. Bare-metal binaries are available for Linux and macOS.

> [!TIP]
> **Already running a media server?** ListenUp sits comfortably alongside Plex, Jellyfin or *arr stacks. Just give it its own port (default `8970`) and point it at a read-only mount of your audiobook folder.

## Install with Docker

The fastest way to a running server is a single `docker run`. Map a port and two volumes — one for ListenUp's own data, one (or more) pointing at your audiobooks.

```bash {file="terminal"}
docker run -d --name listenup \
    -p 8970:8970 \
    -v /srv/listenup/config:/config \
    -v /srv/listenup/metadata:/metadata \
    -v /mnt/media/audiobooks:/audiobooks:ro \
    --restart unless-stopped \
    listenup/server:latest
```

That's enough to get going, but most people prefer a **Compose file** they can version-control. Drop this in a `docker-compose.yml` and run `docker compose up -d`:

```yaml {file="docker-compose.yml"}
services:
  listenup:
    image: listenup/server:latest
    container_name: listenup
    ports:
      - "8970:8970"
    environment:
      TZ: America/New_York
      LISTENUP_BASE_URL: https://listen.example.com
    volumes:
      - ./config:/config
      - ./metadata:/metadata
      - /mnt/media/audiobooks:/audiobooks:ro
    restart: unless-stopped
```

> [!WARNING]
> Mount your audiobook folder **read-only** (`:ro`) unless you want ListenUp to write metadata tags back into your files. ListenUp never moves or renames your media — but read-only guarantees it.

### Verify it's running

Once the container is up, check the health endpoint. A `200 OK` with `"status":"ok"` means the server is ready for setup.

```bash {file="terminal"}
curl http://localhost:8970/healthz
# { "status": "ok", "version": "2.4.1", "db": "ready" }
```

## First-run setup {#first-run}

Open `http://localhost:8970` (or your server's address) in a browser. The first time ListenUp boots with an empty database it walks you through a short setup wizard.

{{< steps >}}

{{< step "Create the admin account" >}}
The very first account you make becomes the server **owner** — it can manage users, libraries and server settings. Pick a strong password; there's no email-reset, this is your server.
{{< /step >}}

{{< step "Add a library" >}}
Point ListenUp at the folder you mounted (`/audiobooks`). You can add several libraries later — for example one for *Audiobooks* and one for *Podcasts* — each with its own folders and scan schedule.
{{< /step >}}

{{< step "Run the first scan" >}}
ListenUp walks your folders, groups files into books, and reads embedded tags. A few thousand titles take a couple of minutes. You can keep using the app while it works — books stream in as they're found.
{{< /step >}}

{{< step "Match metadata" >}}
For anything missing a cover or author, open **Match metadata** and ListenUp fetches details by title, author or ASIN — covers, series order, narrators and descriptions, all in one pass.
{{< /step >}}

{{< /steps >}}

> [!TIP]
> Now connect an app. Open ListenUp on [iOS](/apps/ios/) or [Android](/apps/android/), enter your server URL, and sign in with the admin account you just created. To invite family members, head to **Admin → Invites**.

## Configuration

ListenUp reads configuration from environment variables, which override the defaults written to `/config/config.toml`. The most common ones:

- `LISTENUP_PORT` — HTTP port inside the container. Default `8970`.
- `LISTENUP_BASE_URL` — the public URL clients use. Set this when running behind a reverse proxy so links and cover art resolve correctly.
- `LISTENUP_SCAN_CRON` — cron expression for automatic rescans. Default `0 */6 * * *` (every six hours).
- `LISTENUP_TRANSCODE` — `auto`, `always` or `off`. Leave on `auto` to only transcode when a client can't play the source directly.
- `TZ` — your timezone, so scan schedules and timestamps read correctly.

### Reverse proxy & HTTPS {#reverse-proxy-https}

To reach ListenUp from outside your network — and to get the apps connecting over HTTPS — put it behind a reverse proxy. Caddy makes this a two-line affair with automatic certificates:

```caddyfile {file="Caddyfile"}
listen.example.com {
    reverse_proxy localhost:8970
}
```

Then set `LISTENUP_BASE_URL` to `https://listen.example.com` and restart the container. Nginx and Traefik work too — the only requirements are that WebSocket upgrades pass through and the `X-Forwarded-*` headers are forwarded.

> [!WARNING]
> The mobile apps require a valid TLS certificate to connect over the public internet. Self-signed certificates work on the local network only — use a proper proxy with Let's Encrypt for remote access.

## Updating

Updates are a pull-and-restart. ListenUp migrates its database automatically on boot and is safe to roll back one minor version if needed.

```bash {file="terminal"}
docker compose pull
docker compose up -d
# existing config & library scans are preserved
```

> [!TIP]
> Pin a specific version in production by replacing `:latest` with a tag like `:2.4.1`. The changelog notes any migration that can't be rolled back.

## What to back up

Your audiobooks are your own files — back them up however you already do. For ListenUp itself, only two folders matter, and both are tiny:

- `/config` — the database, users, shelves, progress and server settings.
- `/metadata` — cached cover art and downloaded metadata. Safe to lose; it re-downloads, but backing it up saves a re-fetch.

ListenUp can also write scheduled snapshots and restore from an Audiobookshelf export.
