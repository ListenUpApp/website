+++
title = "Collections"
weight = 10
description = "Admin-managed access control: section off parts of your library for different audiences."
[params]
eyebrow = "Administration"
lede = "Collections decide who sees what. They let admins section off parts of the library for specific people, without splitting it into separate libraries."
+++

Most apps carve up a library with folders or multiple libraries. ListenUp keeps everything integrated: there's **one library**, built from your folders, and **collections manage access to it**. A book lives in your library once; collections decide who can see it.

## What collections are for

A few ways people use them:

- **A safer library for the kids.** Tammy doesn't want her children getting into the latest Stephen King before their road trip, so she makes a **Kids** collection of just the books they're allowed and gives them access to that.
- **A private shelf of your own.** Steve would rather the boys not discover his monster-romance habit, so he keeps a **private** collection that only he can see.
- **Sharing a slice, not the whole thing.** Ron's book club doesn't need his entire library, so he creates a **Sci-Fi Book Club** collection and gives the group access to only that.

## How collections work

Collections are created and managed by **admins**, in two places:

- The **Administration** pane: for creating and managing collections directly.
- A book's **detail page**: choose **Add to Collection** from the overflow menu.

> [!TIP]
> Multiple books can be added to a collection by long pressing on a book cover, selecting the relavent titles and hitting 'Add to Collection'

The moment a book is added to a collection, it's **pulled from every active client** belonging to a user who doesn't have access, in real time.

For unauthorized users, those books don't exist: they're absent from the **Library**, **Streaks**, **Activity**, and everywhere else. Associated data follows the same rule: a series or contributor disappears too, as long as *all* of that series' or contributor's books live in the collection.

> [!NOTE]
> Access is enforced live. Adding a book to a collection, or removing someone's access, updates connected devices right away. There's no "sign out and back in" step.

## Collections vs. shelves

They look similar, both group books, but they solve different problems:

- **Shelves** are personal. Any user can build their own groupings, and they never affect what anyone else can access.
- **Collections** are administrative. They're managed by admins specifically to control access.

> [!TIP]
> Rule of thumb: if it's about *organizing your own listening*, that's a shelf. If it's about *who's allowed to see something*, that's a collection.

## Built-in collections

ListenUp ships with two built-in collections: one enabled by default, and one you can switch on.

### All Books

Think of **All Books** as the default door to your library. Anyone with access to it sees the entire library, minus any books locked away in other collections they're not part of. Every user has access to All Books out of the box.

> [!WARNING]
> Removing a user from **All Books** leaves them with an empty library unless they belong to another collection. It's the simplest way to switch someone from "sees everything" to "sees only what I explicitly share."

### Inbox

The **Inbox** is optional. turn it on under **Administration**. When it's enabled, newly scanned books land in the Inbox *before* they reach the library, so you can:

- Get metadata and details right before anyone else sees the book, and
- Safely sort books into collections without briefly leaking them to users first.

Books stay in the Inbox until you **release** them. Once released, they're sorted automatically into each user's library according to the collections they belong to.
