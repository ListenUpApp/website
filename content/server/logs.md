+++
title = "Logs & health"
weight = 50
description = "Where the server writes its log, how to check it's healthy, and how to share a log from the apps."
[params]
eyebrow = "Server Setup"
lede = "When something goes wrong, the log is where to look first. The server keeps one on disk, and every app keeps its own."
+++

## The server log

The server logs to the container's output, so `docker logs listenup` shows it. It also writes the same lines, with timestamps and full stack traces, to a file in your data directory:

```text
LISTENUP_HOME/logs/server.log
```

The file rotates at 10 MB. Four older files are kept beside it (`server.log.1` and up), so the folder never grows without limit.

To follow it live:

```bash {file="terminal"}
docker logs -f listenup
```

### Log level

Set `LISTENUP_LOG_LEVEL` to `ERROR`, `WARN`, `INFO` (the default), `DEBUG` or `TRACE`. `DEBUG` is the one to reach for when reporting a problem; switch back afterwards, as it is noisy.

## Health check

`GET /healthz` needs no sign-in and answers with the server's status, version and uptime:

```bash {file="terminal"}
curl http://localhost:8080/healthz
```

The image has no shell, so a Docker `HEALTHCHECK` that runs a command inside the container won't work. Point your monitoring at `/healthz` from outside instead.

## What's in the data directory

Everything the server writes lives under `LISTENUP_HOME`:

| Path | Holds |
| --- | --- |
| `listenup.db` | The database: your library, accounts and listening history. |
| `secrets.properties` | The server's generated signing secrets. Back this up with the database. |
| `covers/`, `avatars/`, `contributors/`, `series/` | Artwork and photos. |
| `backups/` | Snapshots you create. See [Backups](/server/backups/). |
| `transcode/` | Converted audio. Safe to delete. See [Transcoding](/server/transcoding/). |
| `logs/` | The server log. |
| `uploads/`, `imports/` | Files in transit from an upload or an Audiobookshelf import. |

## App logs

Each app keeps its own log on the device. If you're reporting a problem that happens in an app, share that log: **Settings → About → Share logs** on Android and iOS, or **Download logs** on the web. It includes full stack traces and is far more useful than a description.
