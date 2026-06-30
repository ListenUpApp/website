+++
title = "Installation"
weight = 10
description = "Run the ListenUp server with Docker, then finish setup from the app."
[params]
eyebrow = "Getting Started"
lede = "Stand up your own ListenUp server with Docker: one container, one data volume, and your audiobooks. Then finish setup from the app."
+++

> [!NOTE]
> ListenUp is **server software you host yourself**. There's no cloud account and nothing to sign up for. You run the server, then connect the apps to it. Your files and listening history never leave your machine.

## System requirements

ListenUp's server is a small native binary, so it's happy on modest hardware.

- **CPU & OS**: a 64-bit **x86 (amd64)** Linux host with Docker. The server currently ships as a native `linux/amd64` image; arm64 isn't supported yet.
- **Memory**: light. There's no JVM, so a small VPS, a NAS, or a spare home server is plenty.
- **Storage**: room for your audiobooks, plus a little for ListenUp's own data directory (the database and cached cover art).

> [!TIP]
> **Already running a media server?** ListenUp sits comfortably alongside Plex, Jellyfin or *arr stacks. Give it its own port (default `8080`) and point it at a read-only mount of your audiobook folder.

## Install with Docker

ListenUp ships as a single image: `ghcr.io/listenupapp/listenup-server`. It needs one persistent volume for its own data (the directory pointed to by `LISTENUP_HOME`) and a mount for your audiobooks. Run it with **host networking** so the apps discover it automatically on your LAN — see [Networking & discovery](#networking) for why, and for the reverse-proxy alternative.

```bash {file="terminal"}
docker run -d --name listenup \
    --network host \
    -v listenup-data:/data \
    -v /mnt/media/audiobooks:/audiobooks:ro \
    -e LISTENUP_HOME=/data \
    -e LISTENUP_LIBRARY_PATH=/audiobooks \
    --restart unless-stopped \
    ghcr.io/listenupapp/listenup-server:latest
```

Most people prefer a **Compose file** they can version-control. Drop this in a `docker-compose.yml` and run `docker compose up -d`:

```yaml {file="docker-compose.yml"}
services:
  listenup:
    image: ghcr.io/listenupapp/listenup-server:latest
    container_name: listenup
    network_mode: host
    environment:
      LISTENUP_HOME: /data
      LISTENUP_LIBRARY_PATH: /audiobooks
    volumes:
      - listenup-data:/data
      - /mnt/media/audiobooks:/audiobooks:ro
    restart: unless-stopped

volumes:
  listenup-data:
```

> [!WARNING]
> Mount your audiobooks **read-only** (`:ro`). ListenUp only ever reads them. It never moves, renames, or writes tags back into your files. Everything it derives lives in its own database instead.

`LISTENUP_LIBRARY_PATH` is optional: leave it unset to start with an empty library and add your folders later from the app. Multiple folders are separated by `:` (for example `-e LISTENUP_LIBRARY_PATH=/audiobooks:/podcasts`). See the [Configuration reference](/server/configuration/) for every setting.

### Networking & discovery {#networking}

ListenUp announces itself on your LAN over mDNS, so the apps find it with no setup. That announcement only reaches your network with **host networking** (`--network host` / `network_mode: host`) — which is why the recipes above use it. On Docker's default bridge network the announcement stays trapped inside the container and discovery silently fails. Host networking is Linux-host only and shares the host's network stack, so the server binds the host's `:8080` directly (no port mapping).

Prefer to keep the container isolated, run on Docker Desktop (macOS/Windows), or put ListenUp behind a reverse proxy for internet access? Use **bridge networking** instead — publish the port and skip auto-discovery:

```bash {file="terminal"}
docker run -d --name listenup \
    -p 8080:8080 \
    -v listenup-data:/data \
    -v /mnt/media/audiobooks:/audiobooks:ro \
    -e LISTENUP_HOME=/data \
    --restart unless-stopped \
    ghcr.io/listenupapp/listenup-server:latest
```

On bridge networking the apps won't discover the server automatically — enter its address by hand instead (for example `http://your-host:8080`). For internet access with HTTPS, see [Reverse proxy & HTTPS](/server/reverse-proxy/).

### Verify it's running

Once the container is up, check the health endpoint. A `200 OK` with `{"status":"ok"}` means the server is ready.

```bash {file="terminal"}
curl http://localhost:8080/healthz
# {"status":"ok"}
```

## First-run setup {#first-run}

ListenUp has no web interface. You set the server up **from the app**. Install ListenUp on your phone, point it at your server, and it walks you through creating the owner account.

{{< steps >}}

{{< step "Install the app and connect" >}}
Get ListenUp for [iOS](/apps/ios/) or [Android](/apps/android/). On the same LAN it discovers your server automatically; if you used bridge networking or you're on a different network, enter its address instead (for example `http://your-host:8080`).
{{< /step >}}

{{< step "Create the owner account" >}}
The first account you make becomes the server **owner**, with full control over users, libraries, collections, and settings. There's no email reset; this is your server, so pick a strong password.
{{< /step >}}

{{< step "Add your library" >}}
If you didn't set `LISTENUP_LIBRARY_PATH`, add your audiobook folders from **Administration**. ListenUp walks the folders, groups files into books, and reads embedded tags. A few thousand titles take a couple of minutes, and books stream in as they're found.
{{< /step >}}

{{< step "Match metadata" >}}
For anything missing a cover or author, fetch details by title, author, or ASIN: covers, series order, narrators, and descriptions, all in one pass.
{{< /step >}}

{{< /steps >}}

> [!TIP]
> To bring in family or friends, open **Administration → Invites** and share an invite link. New sign-ups otherwise follow your [registration policy](/server/configuration/) (an approval queue by default).

## Next steps

With the server running and the app connected, the Server Setup guides cover the rest:

- **[Configuration](/server/configuration/)**: every environment variable.
- **[Reverse proxy & HTTPS](/server/reverse-proxy/)**: reach ListenUp across the internet, with HTTPS.
- **[Updating](/server/updating/)**: pull a new image and restart.
- **[Backups](/server/backups/)**: snapshots, restore, and migrating from Audiobookshelf.
