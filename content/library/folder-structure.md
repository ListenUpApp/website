+++
title = "Folder structure"
weight = 10
description = "How ListenUp reads your folders and turns them into books."
[params]
eyebrow = "Library"
lede = "ListenUp scans your folders and groups files into books automatically. It follows the same conventions as Audiobookshelf, so an existing ABS library works as-is."
+++

## How ListenUp finds a book

A book is one of two things:

- **A folder of audio:** every audio file in a folder becomes one book, and the folder *is* the book. This is the normal case, and the one we recommend.
- **A lone file at a library's root:** a single audio file (say, one `.m4b`) dropped straight into a library root is a book on its own.

So the rule of thumb is **one book per folder**: give each book its own folder. The only thing that can skip the folder is a single, self-contained file placed directly in a library root. Get that right and everything else is just naming.

## The recommended layout

ListenUp reads the **bottom three folders** of a book's path as **author → series → title**:

{{< filetree >}}
Audiobooks/
  Brandon Sanderson/ // author
    The Stormlight Archive/ // series
      * Book 1 - The Way of Kings/ // numbered for series order
        01 - Prologue.m4b
        02 - Chapter 1.m4b
        cover.jpg
        metadata.json
{{< /filetree >}}

Only those bottom three levels matter, so anything above the author folder is ignored. You can keep your library under `Audiobooks/`, `/mnt/media/books/`, or whatever you like, and nest freely above the author.

> [!TIP]
> **Number books in a series.** When a book belongs to a series, start the folder name with its position so ListenUp keeps the series in order. `Book 1 - Title`, `1 - Title`, `1. Title`, and `Vol. 1 - Title` all work, and decimals like `1.5 - Title` are handy for novellas. The number is only read when there's a series folder above the book.

## Simpler layouts work too

The series and author folders are optional. Keep just a title folder, or, for a single self-contained file, skip the folder entirely:

{{< filetree >}}
Patrick Rothfuss/ // author, no series
  * The Name of the Wind/
      the-name-of-the-wind.m4b
* The Martian/ // just a title folder
    part-1.mp3
    part-2.mp3
* The Hobbit.m4b // a single file is its own book
{{< /filetree >}}

## Multi-file and multi-disc books

When a folder holds several files, they become **one book**, played in order. ListenUp orders tracks by disc number, then track number, then filename. It reads those from the audio tags first, falling back to the filenames.

Disc folders are folded into the same book automatically:

{{< filetree >}}
* The Eye of the World/ // one book, two discs
    CD1/
      01.mp3
      02.mp3
    CD2/
      01.mp3
    cover.jpg
{{< /filetree >}}

Only `CD`, `Disc`, or `Disk` followed by a number are merged.

> [!WARNING]
> `Part 1`, `Part 2`, … folders are **not** merged. Each becomes its own separate book. For a single multi-part book, use `CD1`/`Disc 1` folders, or just put all the files in one folder.

## Naming tricks ListenUp understands

You don't need any of these (tags and sidecars work fine), but if you encode details in the **book folder's name**, ListenUp will read and tidy them up:

| In the book folder name | ListenUp reads |
| --- | --- |
| `... (2010)` or `2010 - ...` | publication year |
| `{Kate Reading}` | narrator |
| `[B002V1A0WE]` | Audible ASIN |
| `Book 2 - ...`, `Vol. 3 - ...`, `1.5 - ...` | series sequence (when there's a series folder) |
| `... (Unabridged)` / `... (Abridged)` | abridged flag |

So a fully-annotated folder is read cleanly:

{{< filetree >}}
Robert Jordan/ // author
  The Wheel of Time/ // series
    * Book 1 - The Eye of the World (1990) {Kate Reading} [B002V1A0WE]/ // every hint at once
        eye-of-the-world.m4b
{{< /filetree >}}

> [!NOTE]
> The series **sequence** is only read from the title folder when there's a series folder above it. Without a series folder, `Book 2 - …` is left as part of the title.

## Cover art

ListenUp chooses a cover in this order:

1. A file named `cover.jpg` / `cover.png` / `cover.webp`.
2. Otherwise, the first image in the folder.
3. Otherwise, artwork embedded in the audio file.

So a `cover.*` file always wins if you want a specific image.

## Extra metadata: sidecar files

Drop any of these next to your audio and ListenUp will read them to enrich the book. They're **read-only**. ListenUp never modifies your files; everything it derives lives in its own database.

| File | Adds |
| --- | --- |
| `metadata.json` | full metadata: title, authors, narrators, series (as `Series Name #1`), description, ASIN, genres… |
| `metadata.opf` | Calibre metadata |
| `*.nfo` | title, description, year, and cast |
| `desc.txt` | a description |
| `reader.txt` | narrator(s), one per line |

When sources disagree on a field, ListenUp resolves them in a set order (`metadata.json` → embedded tags → sidecars → filename → folder), which you can change with `LISTENUP_METADATA_PRECEDENCE` (see the [Configuration reference](/server/configuration/)).

## Supported audio formats

ListenUp plays **M4B** and **MP3**, the two standard audiobook file formats, with M4B preferred for its built-in chapters. Closely related files such as **M4A** generally work too. Within those, ListenUp plays whatever codec your device can decode, including modern ones like xHE-AAC and Dolby Atmos.

## What ListenUp skips

- Hidden files and folders (anything starting with `.`).
- Temporary or partial downloads (`.part`, `.tmp`, `.crdownload`, and similar).
- Any folder containing a `.ignore` file, and everything inside it. A handy way to keep a folder out of your library.
- NAS index folders (`@eaDir`).
- Non-audio files left loose in a library root.
