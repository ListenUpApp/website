+++
title = "Why ListenUp"
linkTitle = "Introduction"
weight = 1
description = "The philosophy behind ListenUp: offline-first, social-first, never stranded."
[params]
eyebrow = "Introduction"
lede = "The philosophy behind the app."
+++

## The Problem

{{< bigquote >}}Audiobooks are intimate: the voice in your ear on the morning commute, the companion on a long flight, the story that helps you fall asleep.{{< /bigquote >}}

When you find a narrator you love, you follow them across genres. When a book moves you, you want to share it. ListenUp was made for those people: the ones who love audiobooks and take them seriously.

We started building ListenUp because we wanted an audiobook experience that felt as intentional as our libraries. One that assumed we'd be listening on planes and in subways. One that knew our families and friends might want to share in what we're discovering. One that stayed out of the way until we needed it, and leveraged the devices we use every day.

What emerged is **opinionated software**, built around three principles that show up in every decision we make.

## Our Principles

{{< principles >}}
{{< principle accent="coral" icon="quill" title="Offline-First" ethos="ListenUp assumes you're offline and treats connectivity as a bonus." >}}
Connect to your server and the app downloads everything it needs to function independently: library metadata, progress, and stats, all local. Books you're listening to download in the background. When you reconnect, changes sync in both directions.

The internet is great, but especially for self-hosted software it can be unreliable. We wanted something that worked whether you're on a plane, in a power outage, or roaming on a road trip.
{{< /principle >}}
{{< principle accent="amber" icon="people" title="Social-First" ethos="Books are better shared." >}}
ListenUp is designed as an inherently social experience. See what everyone on your server is reading. Discover new books through Lenses, curated views into collections you might not have found on your own. Build streaks together, and let your listening inspire others.

This doesn't mean ListenUp is noisy. If you're the only person on your server, everything works beautifully. But when you invite others in, the experience gets richer, not more complicated.
{{< /principle >}}
{{< principle accent="green" icon="target" title="Never Stranded" ethos="Magic is only magical when it doesn't get in your way." >}}
Auto-discovery finds your server. Metadata appears automatically. Playback syncs across devices without you thinking about it. But when the magic fails, and it always does, you should never feel stuck.

Every automatic feature has a manual escape hatch. You can always type in a server address, edit metadata by hand, and see exactly what's happening, including the source code. We build for the best case and design for the worst.
{{< /principle >}}
{{< /principles >}}

## What This Means in Practice

These aren't just words on a page. They show up in concrete decisions:

{{< features >}}
{{< feature icon="phone" title="Native clients" >}}Real native apps for iOS and Android. No Electron, no web views. Better performance, better battery, interfaces that belong on your device.{{< /feature >}}
{{< feature icon="refresh" title="Background sync" >}}Books download automatically based on your listening patterns. Your next chapter is always ready before you need it.{{< /feature >}}
{{< feature icon="sliders" title="Manual everything" >}}Convenience features are conveniences, not requirements. We never lock you into automation.{{< /feature >}}
{{< feature icon="waveform" title="Modern codec support" >}}Every format your device supports, including xHE-AAC and Dolby Atmos, with transcoding on the roadmap for older devices.{{< /feature >}}
{{< feature icon="screens" title="Platform depth" wide="true" >}}Today, iOS and Android. The goal is every device you use, natively and beautifully: the web, the desktop, watches, smart TVs, car dashboards, and XR.{{< /feature >}}
{{< /features >}}

## Differences from Audiobookshelf

Both projects meet the same needs from a different set of philosophies. We don't see them as competing, but as serving slightly different communities. Here's an honest breakdown to help you choose:

<div class="compare">
  <div class="crow head">
    <div class="dim">App</div>
    <div class="hcell lu">{{< logo-mark >}}ListenUp</div>
    <div class="hcell abs"><img class="hi" src="/images/audiobookshelf-icon.svg" alt="">Audiobookshelf</div>
  </div>
  <div class="crow">
    <div class="dim">Focus</div>
    <div class="cell lu">Audiobooks only: optimized deeply for one experience.</div>
    <div class="cell">Audiobooks <em>and</em> podcasts in one tool.</div>
  </div>
  <div class="crow">
    <div class="dim">Maturity</div>
    <div class="cell lu">Younger, moves fast, close to the latest platform APIs.</div>
    <div class="cell">Mature and stable, with years of production use.</div>
  </div>
  <div class="crow">
    <div class="dim">Architecture</div>
    <div class="cell lu">Thin Kotlin sync layer; most work on-device. No web UI.</div>
    <div class="cell">Does more centrally, which powers its excellent web interface.</div>
  </div>
  <div class="crow">
    <div class="dim">Configuration</div>
    <div class="cell lu">Opinionated, with few knobs; most of it just works.</div>
    <div class="cell">Extensive options for maximum control.</div>
  </div>
  <div class="crow">
    <div class="dim">Multi-user</div>
    <div class="cell lu">Single library, fine-grained access: one unified, filtered view.</div>
    <div class="cell">Separate libraries users switch between, concrete and visible.</div>
  </div>
  <div class="crow">
    <div class="dim">Contributing</div>
    <div class="cell lu">Kotlin and Swift: higher barrier, truly native results.</div>
    <div class="cell">JavaScript throughout: one language, more accessible.</div>
  </div>
</div>

<p class="compare-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"></path></svg>If you want podcasts, a web interface, or maximum configurability, Audiobookshelf is the better choice, and that's okay.</p>

## Where We're Going

ListenUp is opinionated software, built for people who love audiobooks and want a tool that respects both their library and their time. We're not trying to be everything to everyone. We're trying to be the best possible experience for people who share our priorities.

<div class="spectrum">
  <div class="spec-group today">
    <div class="sg-label"><span class="pulse"></span>Today</div>
    <div class="devs">
      <div class="device"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2.5"></rect><path d="M10 18h4"></path></svg><span class="dl">iOS</span></div>
      <div class="device"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2.5"></rect><path d="M10 18h4"></path></svg><span class="dl">Android</span></div>
    </div>
  </div>
  <div class="spec-group soon">
    <div class="sg-label">On the roadmap</div>
    <div class="devs">
      <div class="device"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path></svg><span class="dl">Web</span></div>
      <div class="device"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M8 21h8M12 17v4"></path></svg><span class="dl">Desktop</span></div>
      <div class="device"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="3"></rect><path d="M9 7l.4-3h5.2L15 7M9 17l.4 3h5.2l.4-3"></path></svg><span class="dl">Watch</span></div>
      <div class="device"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="12" rx="2"></rect><path d="M8 21h8M12 17v4"></path></svg><span class="dl">TV</span></div>
      <div class="device"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13.5 4.6 8A2 2 0 0 1 6.5 6.6h11A2 2 0 0 1 19.4 8L21 13.5M3 13.5h18v3.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1ZM6.5 15.5h.5M17 15.5h.5"></path></svg><span class="dl">Car</span></div>
      <div class="device"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 9.5h19l-1 5.5a3 3 0 0 1-3 2.4 3 3 0 0 1-3-2.4l-.4-2h-2.2l-.4 2a3 3 0 0 1-3 2.4 3 3 0 0 1-3-2.4Z"></path></svg><span class="dl">XR</span></div>
    </div>
  </div>
</div>

{{< banner quote="A first-class listening experience, one that connects you to those you love through the power of story." >}}
If that sounds like what you're looking for: welcome. We're glad you're here.
{{< /banner >}}
