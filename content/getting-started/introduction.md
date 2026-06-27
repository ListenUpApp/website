+++
title = "Introduction"
weight = 1
description = "Why ListenUp?"
[params]
eyebrow = "Introduction"
lede = "Our philosophy behind the app."
+++
# Why ListenUp
## The Problem
Audiobooks are intimate. They're the voice in your ear during the morning commute, the companion on a long flight, the story that helps you fall asleep. When you find a narrator you love, you follow them across genres. When a book moves you, you want to share it.

ListenUp was made for those people. People who love audiobooks and take them seriously.

We started building ListenUp because we wanted an audiobook experience that felt as intentional as our libraries. One that assumed we'd be listening on planes and in subways. One that knew our families and friends might want to share in what we're discovering. One that stayed out of the way until we needed it and one that leveraged the devices we use every day.

What emerged from that process is opinionated software. Built around three principles that show up in every decision we make.

## Our Principles
The three principles that govern the project:

### Offline-First
ListenUp assumes you're offline and treats connectivity as a bonus.

When you connect to your server, the app downloads everything it needs to function independently. Your library metadata, your progress, your stats: all local. Books you're listening to download in the background. When you reconnect, changes sync seamlessly in both directions.

The internet is great, but especially for self hosted software, it can prove unreliable. We wanted a solution that worked whether you're on a plane, during a power outage, or roaming while on a road-trip with friends.

### Social-First
Books are better shared.

ListenUp is designed as an inherently social experience. See what everyone on your server is reading. Discover new books through Lenses, curated views into collections you might not have found on your own. Build streaks together. Let your listening habits inspire others, and let theirs inspire you.

This doesn't mean ListenUp is noisy or intrusive. If you're the only person on your server, everything works beautifully. But when you invite others in, the experience gets richer, not more complicated.

### Never Stranded
Magic is only magical when it doesn't get in your way.

We want ListenUp to feel effortless. Auto-discovery finds your server. Metadata appears automatically. Playback syncs across devices without thinking about it. But when the magic fails and it always does. You should never feel stuck.

Every automatic feature has a manual escape hatch. You can always type in a server address. You can always edit metadata by hand. You can always see exactly what's happening and take control, including of the source code. We build for the best case and design for the worst.

## What This Means in Practice
These aren't just words on a page. They show up in concrete decisions:

- **Native clients** — Real native apps for Android and iOS, built with platform-native toolkits. No Electron, no web views, no compromise. This means better performance, better battery life, and interfaces that feel like they belong on your device.

- **Background sync** — Books download automatically based on your listening patterns. Your next chapter is always ready before you need it.

- **Manual everything** — Convenience features are conveniences, not requirements. We never lock you into automation.

- **Modern codec support.** — ListenUp supports every format your device does. Including xHE-AAC and Dolby Atmos. Down the line we hope to add transcoding for those devices that haven't quite made the cut yet... 

  **Platform depth.** — Today we support iOS and Android. But the goal is to support all the devices you use, natively and beautifully. From Watches, to Smart TVs, Car Interfaces to XR.


## Differences from Audiobookshelf
Both projects meet the same needs but from a different set of philosophies. We don't see the apps as competing, but rather serving a slightly different community of people.  Below is a breakdown to help you decide which project will best meet your needs.

### Focus
ListenUp is exclusively for audiobooks. No podcasts, no other media types. This narrow focus lets us optimize deeply for the audiobook experience rather than building a general-purpose media server.

Audiobookshelf handles audiobooks and podcasts together. If you want one tool for both, it's the clear choice.

### Maturity
Audiobookshelf is a mature, stable project with years of production use. ListenUp is younger and moves faster—we stay close to the latest platform APIs and language features. This means better integration with current devices, but also more frequent changes. We recommend regular backups (which is just a good practice regardless).

### Architecture
ListenUp's server is a thin sync layer written in Kotlin. Most processing happens on your devices, which means lower server resource usage but requires native clients. Audiobookshelf's server does more work centrally, which enables its excellent web interface. ListenUp currently has no web interface, so if that's a priority platform for you. Audiobookshelf is the better choice.

### Configuration
Audiobookshelf offers extensive options for metadata scrapers, file handling, and server configuration. ListenUp is more opinionated with fewer knobs to turn, but less to figure out and most of it just "works". If you want maximum control over your setup, Audiobookshelf is the better fit.

### Multi-User Experience
ListenUp uses a single-library design with fine-grained access controls. Everyone sees a unified collection filtered by their permissions-seamless, but requires trust in the access control system.

Audiobookshelf uses separate libraries that users switch between explicitly. More manual, but the separation is concrete and visible.

### Contributing
Audiobookshelf is JavaScript throughout. One language across the stack makes contributions more accessible. ListenUp spans Kotlin, and Swift, which raises the barrier to entry but lets us build truly native experiences for each platform. We believe the extra complexity speaks for itself in the final product.

## Where We're Going
ListenUp is opinionated software. It's built for people who love audiobooks and want a tool that respects both their library and their time.

We're not trying to be everything to everyone. We're trying to be the best possible experience for people who share our priorities: offline resilience, social discovery, and interfaces that feel inevitable rather than adequate. And most importantly: A first class audiobook listening experience. One that connects you to those you love through the power of story.

If that sounds like what you're looking for, welcome. We're glad you're here.
