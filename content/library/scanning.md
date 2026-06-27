+++
title = "Scanning"
weight = 20
description = "How ListenUp keeps your library in sync: the live watcher, automatic rescans, and manual scans."
[params]
eyebrow = "Library"
lede = "After the first scan, ListenUp keeps your library in sync on its own. Here's how that works, and how to rescan by hand when you want to."
+++

This page is about scanning *after* your library exists. For the very first scan see [First Steps](/library/first-steps/), and for how files become books see [Folder structure](/library/folder-structure/).

## It keeps up on its own

You rarely need to scan manually. ListenUp watches your folders and rescans on a few triggers:

| Trigger | When it runs | Control |
| --- | --- | --- |
| **Live watcher** | the moment files are added, changed, moved, or removed | always on |
| **On startup** | every time the server starts | `LISTENUP_SCAN_RESCAN_ON_STARTUP` (on by default) |
| **Periodic** | every 6 hours, as a safety net | `LISTENUP_SCAN_PERIODIC_RESCAN_INTERVAL` |

The **live watcher** is the one you'll notice: drop a new book into a watched folder and it appears in the apps within moments. To avoid grabbing a file that's still copying, ListenUp waits for it to stop changing for a couple of seconds before picking it up.

The **periodic** rescan is just a backstop in case something slips past the watcher. Change its interval, or set it to `0` to switch it off (the watcher keeps running), in the [Configuration reference](/server/configuration/).

> [!TIP]
> Because the watcher catches changes live, most libraries never need a manual scan. The automatic triggers keep everything current.

## Rescanning by hand

When you do want to force it (say you copied files over a protocol the watcher can't see), an admin can trigger a scan from the app:

- **Rescan the library:** re-walks everything.
- **Rescan a folder:** re-walks just one of your library folders.

Either way it's fire-and-forget: the scan starts immediately and its progress streams live. Unchanged books are skipped (ListenUp fingerprints them), so rescanning a settled library is quick.

## Watching a scan

While a scan runs, the app shows live progress (a progress bar and a marquee of books as they're matched), moving through two visible stages: **Scanning**, then **Persisting** (writing everything to the database). A few thousand books take a couple of minutes; larger libraries proportionally longer.

> [!NOTE]
> A scan runs to completion. There's no pause or cancel. If a scan is already running, triggering another does nothing until the first finishes.

## Moves, edits, and removals

A rescan only does the work that's actually changed:

- **Added** books appear.
- **Edited** books (new files, changed tags) update in place.
- **Removed** books drop out of the library.
- **Moved** books keep their identity, and your listening progress, even if you reorganize folders.

> [!WARNING]
> Move detection relies on stable file IDs (inodes). On filesystems that don't provide them (FAT, some network shares, and Windows by default), a moved book looks like a removal plus a fresh addition, which can reset its progress. Reorganize on those filesystems sparingly.

## When a book can't be read

If ListenUp can't read or decode a book's audio, it still adds the book from whatever the folder name and sidecars provide, and flags it with a **warning on the book's detail screen**. That usually means the file is corrupt or in a format ListenUp doesn't support (see [supported formats](/library/folder-structure/#supported-audio-formats)). Replace or re-encode the file and the next scan clears the warning.

## Inbox
If you don't want scanned books to hit your library until you've had a chance to enrich or sort them you can turn on the inbox under admin settings. See [Inbox](/admin/collections#inbox)
