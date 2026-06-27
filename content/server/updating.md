+++
title = "Updating"
weight = 30
description = "Pull a new image and restart: your data and database migrate automatically."
[params]
eyebrow = "Server Setup"
lede = "Updating ListenUp is a pull-and-restart. Your data lives in the LISTENUP_HOME volume, so it survives the swap."
+++

ListenUp migrates its database automatically on boot, so updating is just pulling the new image and recreating the container.

With Compose:

```bash {file="terminal"}
docker compose pull
docker compose up -d
```

With a bare `docker run`, pull the new image, stop and remove the old container, and start it again with the same flags. Your `listenup-data` volume and audiobook mount carry straight over:

```bash {file="terminal"}
docker pull ghcr.io/listenupapp/listenup-server:latest
docker rm -f listenup
# then re-run your original `docker run …` command
```

> [!NOTE]
> The database schema migrates **forward** automatically when the new version starts. Migrations run before the server accepts connections, so the first boot after an update may take a moment longer than usual.

> [!TIP]
> For production, pin a specific version instead of `:latest` (for example `ghcr.io/listenupapp/listenup-server:0.6.0`) so updates happen when you choose them, and check the changelog before moving between versions.
