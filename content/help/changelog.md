+++
title = "Changelog"
weight = 20
description = "What changed in each release"
[params]
eyebrow = "Help"
lede = "What's shipped in each ListenUp release."
+++

> [!NOTE]
> ListenUp is in **beta**; releases move quickly and this page tracks the headline changes. The [GitHub Releases page](https://github.com/ListenUpApp/ListenUp/releases) is the canonical record.

## v0.9.14 — current

*17 November 2026.* **Android 11 and 12.** ListenUp now runs on Android 11 and later, which covers the dedicated audio players that ship older Android and rarely update.

## v0.9.11 – v0.9.13

*14 – 17 November 2026.*

- **Parts.** Books divided into parts show them on Book Detail and as dividers across the chapter list, and the chapter editor can mark where a part or book begins.
- **Reading together.** Book Detail shows every other reader on the chapter they've reached, lit while they're listening, and how far along readers partway through a book are.
- **Discover.** "Something new" is one scrollable row, and books outside a series no longer say "Standalone."

## v0.9.9 – v0.9.10

*26 – 29 October 2026.* A redesign of the everyday screens on every platform.

- **Now Playing.** A new player on phones and wide screens, with sheets for speed, sleep, boost, chapters and people, and a mini player that grows into Now Playing under your finger.
- **Home and Discover.** Both redesigned; Discover now leads with who is listening.
- **Library.** Status filters, one sort control, a letter index, a long-press menu and Select all.
- **Book Detail.** A new hero and action row, sections that follow where you are in the book, and chapters that play when tapped.
- **Photos.** Adjust how a person's photo is framed, and it stays that way everywhere.
- **Hardcover ratings.** Ratings you made on Hardcover appear in ListenUp.
- **Reconnecting.** A dropped connection now says so instead of looking like a failure.

## v0.9.8

*10 October 2026.* **Logs you can share.** The server writes a log file into its data folder, and every app keeps a log you can share from Settings.

## v0.9.7

*9 October 2026.*

- **Match details.** One Find searches every catalogue at once. Review a match field by field, apply it in one go, and undo it afterwards. The same flow works for people, with photo and biography applied separately.
- **One permission model.** Edit metadata and Curate library replace the older per-user switches, with presets.
- **Series within series.** A series can belong to a larger one.
- **Ratings.** Book Detail shows your rating first, then everyone else's.

## v0.9.6

*3 October 2026.*

- **Hardcover.** Connect a Hardcover account from Settings. What you listen to appears there, books you read elsewhere arrive badged, your Want to Read list lands on your To Read shelf, and any single book can be kept off Hardcover.
- **Ratings.** Rate a book with stars and a note, and see how Audible listeners rate it.
- **A real admin inbox.** Held books wait in the inbox until an admin releases them.
- **Undo for merges.** Series and genre merges can be undone from any app.
- **Restricted books.** Admins can see which books are restricted and who can't see them.
- **Mark finished on the right day.** Record a finish on the date it actually happened.
- **Continue On** hands a book to another device on Android.
- Design-quality passes on Android, iOS and web, including accessibility and tablet layouts.

## v0.9.4 – v0.9.5

*21 September 2026.* **The web client arrives.** The server image now ships and serves a full web client at `/`: library, player, editing and administration in a browser, with nothing to install. It also works over plain HTTP, with one limit described in [Web](/apps/web/#https). The chapter editor reaches iOS and the browser in the same release.

## v0.9.2 – v0.9.3

*2 – 5 September 2026.*

- **Uploads and organisation.** Admins can upload books, organise how they're filed, and delete a book.
- **A new chapter editor.** A timeline, tools on every row, and a way to fix hundreds of chapter times by pinning two of them.
- **Reorder shelves** by dragging, online or off.

## v0.9.0 – v0.9.1

*22 – 23 August 2026.*

- **Play in a browser.** The server transcodes on demand, and only for books a browser can't decode itself.
- **Notifications.** A bell, an inbox, and a setting for each kind of notification.
- **Haptics** on transport controls and completed actions.

## v0.8.1 – v0.8.9

*31 July – 17 August 2026.*

- **CarPlay**, and Android Auto polish. The car, the lock screen and the notification all follow the current chapter.
- **Volume boost** and loudness normalisation.
- **Forgot password.** A reset an admin approves, completed with a code passed along in person.
- **Push notifications.**
- **On-device logs** you can share from Settings.

## v0.8.0

*26 July 2026.* The foundation for everything above: the server rebuilt in Kotlin and shipped as a small native binary, with collections, shelves, backups and restore, Audiobookshelf import, and multi-user accounts with invites.

## Earlier releases

| Version | Date |
|---|---|
| v0.6.0 | 2026-03-20 |
| v0.5.2 | 2026-02-19 |
| v0.5.1 | 2026-02-17 |
| v0.5.0 | 2026-02-17 |
| v0.4.0 | 2026-02-15 |
| v0.3.0 | 2026-02-14 |
| v0.2.1 | 2026-02-11 |
| v0.2.0 | 2026-02-11 |
| v0.1.0 | 2026-02-09 |

These predate the public beta docs.
