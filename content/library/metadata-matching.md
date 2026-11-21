+++
title = "Metadata matching"
weight = 30
description = "Match a book against Audible and Hardcover, review every change before it lands, and undo it afterwards."
[params]
eyebrow = "Library"
lede = "ListenUp builds each book from your own files. When you want richer or cleaner details, match it against the online catalogues or edit anything by hand."
+++

Out of the box, ListenUp derives a book's details from your files: embedded tags, sidecars, and folder names (see [Folder structure](/library/folder-structure/)). Matching adds what the files don't have.

## Matching a book

Matching is something **you start**, one book at a time. ListenUp never matches books on its own during a scan.

Open the book, then **⋯ → Match details…**

{{< steps >}}

{{< step "Find" >}}
One search asks every catalogue at once: **Audible** and **Hardcover** for the book itself, and **iTunes** for extra cover art. ListenUp starts from what it already knows (an ASIN or ISBN if the book has one, otherwise the title and author) and you can change the search.

Results are ranked against your copy, including its length, and labelled **Best match**, **Strong match** or **Maybe**. If one catalogue doesn't answer, you still get the others' results and a note saying which was missing.
{{< /step >}}

{{< step "Review" >}}
Pick an edition and ListenUp lays out what would change, in groups:

- **Changes**: fields the match would replace.
- **Fills a gap**: fields you don't have yet.
- **Already the same**: nothing to do.
- **You edited this**: fields someone changed by hand. These are kept unless you tick them.
- **Cover**, **Genres & moods** and **Chapter names**.

Tick or untick anything. The fields on offer are title, subtitle, description, publisher, release date, language, authors, narrators and series. Chapter names are offered only when the edition has the same number of chapters as your copy.

In a hurry? **Skip to Apply** accepts the suggested set.
{{< /step >}}

{{< step "Apply" >}}
**Apply changes** saves everything you ticked in one go, and it syncs to every device.
{{< /step >}}

{{< /steps >}}

> [!NOTE]
> **Tags are yours.** Matching never changes them.

### Undoing a match

After a match, the book's page says when it was matched and by whom. **See what changed** lists every field the match touched, and **Undo last match** puts them all back.

Undo is available until the book is changed again. After that, the earlier state is no longer a clean thing to return to.

### Audible stores

Audible's catalogue differs by country. An admin sets the library's **Store region** in Administration, and any single search can pick a different store. There are ten: US, UK, Germany, France, Australia, Canada, Japan, Italy, India and Spain.

### Who can match

Finding, applying and undoing a match all need the **Edit metadata** permission, which members have by default. See [People & permissions](/admin/people/).

## Editing by hand

Every book has an edit form where you can set:

- **Text**: title, sort title, subtitle, description, publisher, year, language, ISBN, ASIN, and the abridged flag.
- **People**: contributors by role: author, narrator, editor, translator, and more.
- **Series**: the series and the book's number within it.
- **Genres, tags, and moods**: pick genres from your existing list; create tags and moods on the fly.
- **Chapters** and the **cover**. See [Editing your library](/admin/editing/).

### Editing several books at once

Select books in the Library and choose **Edit**. You can set publisher, language and publication year, and **add** a series, contributors, genres, tags or moods. Adding never removes what's already there, and a **What will change** summary shows the result before you apply it.

## Covers

You can set a cover two ways: choose one offered during a match, or **upload your own** from the edit form.

> [!TIP]
> An **uploaded** cover always wins and survives rescans. It's the way to pin a specific image.

## Will my changes stick? {#will-my-changes-stick}

Yes. ListenUp remembers where each field's value came from, and a weaker source never overwrites a stronger one:

| Source | Strength |
| --- | --- |
| Your files, read by a scan | Lowest |
| A match you applied | Higher |
| An edit made by hand | Highest |

So a rescan never undoes a match or a hand edit, even if the file's tags change. A later match leaves hand-edited fields alone unless you tick them. Uploaded covers and edited chapters are protected the same way.

### The `listenup.json` file

When you match or edit a book, ListenUp also saves that work to a small `listenup.json` file in the book's folder. If you ever rebuild the server from scratch, or copy the folder to a friend's ListenUp, a scan reads the file back and your edits return.

This needs a library the server can write to. With the library mounted read-only, the file can't be written and your edits live only in ListenUp's database, which is one more reason to keep [backups](/server/backups/). See [Read-only or writable?](/getting-started/installation/#read-only-or-writable).

## Ratings from outside

A book's **ListenUp score** combines ratings from outside sources. Those are fetched without anyone asking: a little of the library is refreshed each night, and a book's Hardcover rating is fetched when someone opens it. Admins can refresh a book's ratings by hand from its page.

## What leaves your server

Matching and ratings talk to the catalogues directly from your server, never through us:

- **Audible** and **Audnexus**, for book and author details.
- **iTunes**, for cover art.
- **Hardcover**, for details and ratings.

A search sends what's needed to find the book: a title and author, or an ASIN or ISBN. Nothing about your users is included. [Hardcover accounts](/library/hardcover/) are a separate, opt-in feature.

## Not supported yet

- **Bulk matching**: it's one book at a time.
- **Automatic matching**: a match is always something you start.
- **Series artwork**: there's no online source for it.
