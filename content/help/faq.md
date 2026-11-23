+++
title = "FAQ"
weight = 10
description = "Common questions and fixes"
[params]
eyebrow = "Help"
lede = "Quick answers to the questions that come up most, with links to the full guides."
+++

## What platforms does ListenUp run on?

Apps for iOS (iOS 26 or later) and Android (Android 11 or later), a [web client](/apps/web/) the server hosts itself, and CarPlay and Android Auto through the phone apps. All are in beta, and all talk to a server you host (a `linux/amd64` Docker image). See [Introduction](/getting-started/introduction/) and [Installation](/getting-started/installation/).

## Where does my data live?

On your server and your devices — there's no cloud account. Your files and listening history never leave your machine. See [Installation](/getting-started/installation/).

## Does it work offline?

Yes, offline-first. Playing a book downloads it in the background so it's ready with no connection, and changes sync back to your server the next time you reconnect. See [Downloads & storage](/apps/downloads-and-storage/).

## What audio formats are supported?

The common ones — M4B, MP3, M4A, AAC/MP4, FLAC, Ogg/Opus — plus a long tail of other container and codec combinations (WAV, AIFF, WMA, WebM, MKA, CAF, and more). Playback runs on each platform's native engine (Media3 on Android, AVFoundation on iOS), so how well an exotic format plays back depends on your device.

## Can I invite family and friends?

Yes — open **Administration → Invites** and share the link. Opening it on a phone lands the person directly in the app's join flow. Anyone signing up another way follows your [registration policy](/server/configuration/), an approval queue by default.

## The app doesn't find my server — what now?

Auto-discovery needs **host networking** (mDNS). On bridge networking, or across networks, add the server manually by URL instead. See [Networking & discovery](/getting-started/installation/#networking).

## How do I back up my server?

Everything lives under the `LISTENUP_HOME` data directory. For a clean, consistent archive, create an in-app snapshot from **Administration → Backups**. See [Backups](/server/backups/).

## Can I migrate from Audiobookshelf?

Yes — listening progress and play history import from an Audiobookshelf backup via **Administration → Import**. See [Importing from Audiobookshelf](/server/backups/#importing-from-audiobookshelf).

## Does ListenUp modify my audio files?

Never. ListenUp doesn't write tags into your audio or re-encode it.

Whether it can touch the *folder* is up to you. Mounted read-only, it changes nothing at all. Mounted writable, it saves your edits in a small `listenup.json` beside each book, and admins can upload, organise and delete books from the apps. See [Read-only or writable?](/getting-started/installation/#read-only-or-writable)

## I forgot my password — what now?

Choose **Forgot password?** on the sign-in screen. An admin on your server approves the request and gives you a short code to finish. If you *are* the only admin, see [When the owner is locked out](/admin/people/#root-reset).

## Can other people see what I'm listening to?

On a shared server, yes: members see each other's listening, finishes and ratings. Shelves can be private, and admins can hide books with collections. See [What others can see of you](/listening/together/#privacy).

## Something's wrong — how do I report it?

Share the app's log from **Settings → About → Share logs** (on the web, **Download logs**), and the server's from its data directory. See [Logs & health](/server/logs/).
