+++
title = "Transcoding"
weight = 25
description = "When the server converts audio on the fly, what it costs, and how to tune or turn it off."
[params]
eyebrow = "Server Setup"
lede = "ListenUp plays your files as they are whenever it can. It converts audio only when a client says it can't decode a book, and then only that book."
+++

## When it happens

Each client tells the server which audio formats it can decode. If a book's audio is on that list, the server sends the original file untouched. If it isn't, the server converts the audio as it plays.

In practice this is about **browsers**. The phone apps play nearly everything natively, while a browser may refuse formats such as xHE-AAC. See [Web](/apps/web/).

A converted book is sent as an HLS stream of AAC audio at 64 kbps, with the original channel layout. Your files are never changed; the converted audio lives in a cache the server manages.

## Nothing to install

FFmpeg ships inside the server image, so transcoding works out of the box.

If FFmpeg is missing or can't encode (for example, in a build of your own), the server still starts. It serves the original files and tells the client that conversion isn't available.

## What it costs

- **Disk.** Converted audio is cached in `transcode/` inside your data directory, up to **10 GiB** by default. When the cache is full, the oldest files are cleared first. A book that's playing is never cleared.
- **CPU.** Up to **two** books convert at once by default. A third listener isn't queued; their app is asked to try again shortly.
- **Idle sessions** are stopped after a minute, so a paused book doesn't hold a slot.

## Tuning

| Variable | Default | What it does |
| --- | --- | --- |
| `LISTENUP_TRANSCODE_CACHE_BYTES` | `10737418240` | Size of the cache, in bytes. `0` turns transcoding off. |
| `LISTENUP_TRANSCODE_MAX_SESSIONS` | `2` | How many books may convert at once. |
| `LISTENUP_TRANSCODE_BITRATE_KBPS` | `64` | Bitrate of the converted audio. |
| `LISTENUP_TRANSCODE_PROBE_ON_STARTUP` | `true` | Checks at startup that FFmpeg can encode. |

> [!NOTE]
> A mistyped number in the first three doesn't stop the server; it falls back to the default. If a change seems to have no effect, check the value.

## Turning it off

Set `LISTENUP_TRANSCODE_CACHE_BYTES=0`. Every book is then sent as its original file, and a browser that can't decode a book won't be able to play it.
