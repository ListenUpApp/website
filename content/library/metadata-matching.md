+++
title = "Metadata matching"
weight = 30
description = "Enrich your books from Audible, or edit metadata by hand: covers, series, narrators, and more."
[params]
eyebrow = "Library"
lede = "ListenUp builds each book from your own files. When you want richer or cleaner details, you can match against Audible or edit anything by hand, right in the app."
+++

Out of the box, ListenUp derives a book's details from your files: embedded tags, sidecars, and folder names (see [Folder structure](/library/folder-structure/)). Metadata matching adds the sources you reach for when you want more: **Audible** for full details, and hand-editing for everything else.

## Matching against Audible

Matching is something **you start**. ListenUp never reaches out to Audible on its own during a scan. When you want to enrich a book, open it and start a metadata match:

1. **Search.** ListenUp queries Audible with the book's title and author (or its ASIN). Edit the search however you like, and pick the Audible region if your edition is region-specific.
2. **Pick the right edition** from the results.
3. **Choose what to apply.** A preview lets you toggle each field on or off (title, subtitle, description, publisher, release date, language, cover, authors, narrators, series, genres, moods, and tags), so a match never clobbers details you'd rather keep.
4. **Apply.** Your choices are saved and sync to every device.

iTunes is also checked for **high-resolution cover art**, so you'll often get a sharper cover option than Audible alone.

> [!NOTE]
> Searching is open to anyone signed in, but **applying** a match (or editing) needs edit permission. That's admins, or members you've granted it to.

## Editing by hand

Prefer to type it yourself? Every book has an edit form where you can set:

- **Text**: title, sort title, subtitle, description, publisher, year, language, ISBN, ASIN, and the abridged flag.
- **People**: contributors by role: author, narrator, editor, translator, and more.
- **Series**: the series and the book's number within it.
- **Genres, tags, and moods**: pick genres from your existing list; create tags and moods on the fly.
- **Chapters** and the **cover** (below).

## Covers

You can set a cover three ways: choose one offered during an Audible/iTunes match, run a dedicated **cover search**, or **upload your own** from the edit form.

> [!TIP]
> An **uploaded** cover always wins and survives rescans. It's the way to pin a specific image.

## Authors and narrators

Contributors can be matched too: search Audible for an author or narrator to pull in their **name, biography, and photo**. (Series don't have online artwork.)

## Will my changes stick?

Two things are **always** protected from rescans: an **uploaded cover** and **hand-edited chapters**.

Most other fields are *derived from your files*, so if you later change a book's audio or its tags, the next scan re-reads that book and can replace your text edits with what the files say. (Books you don't touch are left alone.)

> [!WARNING]
> To make a text change **permanent**, surviving any future file change, put it in the book's `metadata.json` sidecar. ListenUp reads `metadata.json` at the top of its [precedence order](/library/folder-structure/) and never writes to your files, so a sidecar value always sticks. Editing in the app is great for quick fixes; the sidecar is for changes you want to keep no matter what.

## Not supported yet

- **Bulk matching**: it's one book at a time.
- **Automatic enrichment**: a match is always something you start.
- **ISBN lookup** and **series artwork**: there's no online source for these.
