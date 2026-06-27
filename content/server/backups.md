+++
title = "Backups"
weight = 40
description = "Snapshots, restore, and migrating from Audiobookshelf, all from the app."
[params]
eyebrow = "Server Setup"
lede = "Everything ListenUp knows lives in one place, so backing up is mostly a matter of keeping a copy of it, plus in-app snapshots for a clean, consistent archive."
+++

## What to back up

ListenUp keeps all of its state under the **`LISTENUP_HOME` data directory** (the `listenup-data` volume from [Installation](/getting-started/installation/)): the database, your auto-generated secrets (`secrets.properties`), and cached artwork. Back up that directory and you've captured the whole server.

Your audiobooks are your own files; back them up however you already do. ListenUp only ever reads them, so they're never at risk from the server.

> [!TIP]
> For a *consistent* copy of a running server, use an in-app snapshot (below). It captures the database safely while the server is live. A plain file copy of `LISTENUP_HOME` works too; stop the container first so the database isn't mid-write.

## Snapshots

ListenUp can bundle its database, and optionally cover and avatar images, into a single `.listenup.zip` archive. An admin creates these from the app:

1. Open **Administration → Backups**.
2. Tap **Create backup**, and choose whether to include images.
3. The archive is written to `LISTENUP_HOME/backups/`. From the same screen you can **download it to your device**.

> [!NOTE]
> Snapshots are **on-demand**. There's no automatic schedule yet, and old archives aren't pruned for you, so clear out ones you don't need from the Backups screen now and then.

> [!WARNING]
> A snapshot does **not** include `secrets.properties`. Restoring onto a *different* machine changes the server's signing keys, so everyone will be signed out and need to log in again. To move a server wholesale without that, also copy `LISTENUP_HOME` (or at least `secrets.properties`) across.

## Restoring

Restore from the app, either from a snapshot already on the server, or from a `.listenup.zip` on your device:

1. Open **Administration → Backups**, pick a backup (or upload one from your device), and confirm **Restore**.
2. ListenUp verifies the archive, swaps in the restored database and images **live** (no server restart), and rolls back automatically if anything goes wrong.
3. Your apps re-sync from the restored server the next time they connect.

> [!NOTE]
> You can restore a backup onto the same server version or a newer one. If you're restoring a *newer* backup onto an older server, update the server first. Its database schema has to be at least as new as the backup's.

## Importing from Audiobookshelf

Moving from Audiobookshelf? ListenUp can bring your **listening progress and play history** across.

Two prerequisites: your books must already be scanned into ListenUp's library (the importer matches against what's there: by ASIN, ISBN, file path, or title), and your users must already exist, since you map each Audiobookshelf user to a ListenUp account.

From the app:

1. Open **Administration → Import** and upload your Audiobookshelf backup (`.audiobookshelf`).
2. ListenUp **analyzes** it and matches books, sorting them into confident matches, ambiguous ones, and items it couldn't place.
3. **Review** the matches and **map** each Audiobookshelf user to a ListenUp account.
4. **Apply**: progress and play sessions are written in.

> [!NOTE]
> Import covers listening progress and play sessions. It doesn't bring over bookmarks, collections, or cover art, and it only touches books already in your library. It's safe to re-run if you need to.
