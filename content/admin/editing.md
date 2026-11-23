+++
title = "Editing your library"
weight = 20
description = "The chapter editor, uploading books, organising files, deleting a book, and tidying series and genres."
[params]
eyebrow = "Administration"
lede = "The tools for shaping the library itself: fixing chapters, adding and filing books, and merging what should be one thing."
+++

Most of this page needs the **Edit metadata** permission; merging and deleting need **Curate library**; uploading, organising files and deleting a book are for admins. See [People & permissions](/admin/people/).

Some of these tools **change files in your library folder**. Each section says so, and [Read-only or writable?](/getting-started/installation/#read-only-or-writable) covers the choice.

## The chapter editor {#chapters}

Open a book, then **⋯ → Edit chapters**. It works on Android, iOS and the web.

- **A timeline** of the whole book, with a close-up lane for placing a boundary exactly.
- **Add a chapter** at the point you're listening to, **nudge** a boundary earlier or later, or type a start time.
- **Lock** a chapter you've got right so later fixes leave it alone.
- **Undo and redo** everything.

### Fix drift

Chapter times from a different edition are often right at the start and steadily further off by the end. Rather than fixing three hundred chapters, fix two: pin one chapter you can hear is right, then a second one much later in the book. Everything between them is corrected to fit.

### Parts and books

**Start a part here** marks where a part begins, and **Start a book here** does the same for each book in an omnibus. Listeners see these as headings across the [chapter list](/listening/player/#chapters-and-parts).

Edited chapters are yours: a later rescan never overwrites them.

## Uploading books

Admins can add books without touching the server's disk: **Administration → Upload books**, from Android, iOS or the browser. Choose files or a whole folder.

The upload is checked, then moved into your first library folder, filed according to your organisation setting below. A book that's already in the library is refused rather than duplicated.

> [!NOTE]
> Uploading writes to your library folder, so the library must be mounted writable.

## Organising files

**Administration → File organization** sets how books are filed on disk: **Author / Series / Title** (the default), **Author / Title**, or **Title only**.

Choosing a layout moves nothing by itself. Two things act on it:

- **Uploads** are filed this way as they arrive.
- **Organize library** is a sweep you start. It shows a preview of every move first, then moves folders and renames single-file books to match.

Books ListenUp found by scanning stay exactly where you put them unless you run the sweep.

## Deleting a book

**⋯ → Delete from server…** is for admins, and it means it: the book's **folder and every file in it are deleted from the server**, every member loses it, and downloads are removed from their devices. The confirmation spells out how many files and how much space. It can't be undone.

If two books share one folder, ListenUp refuses, since it can't delete one without the other.

To hide a book without deleting it, use a [collection](/admin/collections/) instead.

## Series

A series can sit **inside another**: a trilogy within a larger universe, say. In the series editor, use **Part of** to place a series under a parent, or **Add sub-series** from the parent.

**Merge into…** combines two series that should be one. A merge can be undone: the surviving series lists what was **Merged into this**, each with an **Undo**.

## Genres

**Administration → Categories** is the genre tree. Select a genre to rename, move, merge or delete it. **Merge history** lists past merges, each with an undo.

Members with **Curate library** get a shorter version under **Settings → Library → Categories**.

> [!NOTE]
> Merges made before v0.9.6 can't be undone; undo arrived in that release.

## Seeing who can't see a book

When a book is in a collection, admins see a lock on its cover. Its page has a section only admins see, saying whether every member can see the book or who it's **hidden from**, and why. It's the quick way to check a [collection](/admin/collections/) is doing what you meant.
