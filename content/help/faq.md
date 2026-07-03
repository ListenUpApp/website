+++
title = "FAQ"
weight = 10
description = "Common questions and fixes"
[params]
eyebrow = "Help"
lede = "Quick answers to the questions that come up most, with links to the full guides."
+++

## What platforms does ListenUp run on?

Apps for iOS and Android, currently in beta, both talking to a self-hosted server (a `linux/amd64` Docker image). More platforms are on the roadmap. See [Introduction](/getting-started/introduction/) and [Installation](/getting-started/installation/).

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

Never. Your library is mounted read-only and everything ListenUp derives — metadata, progress, covers — lives in its own database instead. See [Installation](/getting-started/installation/).
