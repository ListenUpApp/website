+++
title = "The player"
weight = 10
description = "Now Playing, speed, the sleep timer, volume boost, chapters and auto-rewind."
[params]
eyebrow = "Listening"
lede = "Everything the player does, and the settings behind it. It works the same way on Android, iOS and the web unless a section says otherwise."
+++

## Now Playing

The main controls are the same everywhere: **previous chapter**, **skip back**, **play/pause**, **skip forward**, **next chapter**. The scrubber covers the **current chapter**, not the whole book, so a small drag is a small move.

**Previous chapter** goes to the start of the chapter you're in first. Press it again within three seconds to go to the one before.

Below the controls are **Speed**, **Sleep** and **Chapters**. The **More** menu holds Go to book, Go to series, Go to author, Open PDF, Volume boost and Close book.

### The mini player

While a book is loaded, a small player stays on screen as you browse.

- **Android:** tap it or swipe up to open Now Playing.
- **iOS:** it sits above the tab bar. Tap it or swipe up to open Now Playing; swipe down to close.
- **Web:** on a wide window the bar along the bottom is the full set of controls. On a narrow one, Now Playing is its own page.

On tablets, foldables and iPad, Now Playing shows the chapter list beside the player.

### Keyboard shortcuts (web)

| Key | Does |
| --- | --- |
| `Space` | Play or pause |
| `←` / `→` | Skip back or forward |
| `Shift` + `←` / `→` | Previous or next chapter |
| `<` / `>` | Slower or faster |
| `T` | Sleep timer |
| `C` | Chapters |
| `P` | Open or close Now Playing |
| `Esc` | Close Now Playing |
| `/`, or `⌘K` / `Ctrl+K` | Search |
| `?` | Show every shortcut |

## Skipping

Skip back and skip forward use intervals you choose in **Settings → Playback**:

- **Skip forward:** 10, 15, 20, 30, 45, 60, 90 or 120 seconds. The default is 30.
- **Skip backward:** 5, 10, 15, 20, 30, 45 or 60 seconds. The default is 10.

A skip is measured in listening time. At 2× speed, a 30-second skip moves 60 seconds through the book, so it always feels like the same jump.

## Speed

Speed runs from **0.5×** to **3.0×** in steps of 0.05. The speed sheet has a slider, plus and minus buttons, and one-tap presets.

A speed you pick **applies to that book only**, which is handy when one narrator is slower than the rest. New books start at the **Default speed** from Settings, and the sheet has a button to reset a book back to it.

## Sleep timer

Choose **End of chapter**, or 15, 30, 45, 60 or 120 minutes, or **Custom** for anything up to 12 hours.

When the timer runs out, the audio **fades out over a few seconds** and then pauses. If you're still awake, tap **Keep listening** during the fade and playback carries on at full volume.

While a timed sleep is running you can add 5, 10 or 15 minutes from the same sheet. Opening a different book cancels the timer.

Settings has a **Default timer**, which is where the Custom stepper starts.

## Volume boost

Some recordings are simply quiet. **Volume boost**, in the More menu, raises one book by **+3, +6, +9 or +12 dB**. Like speed, it applies to that book only, and Settings has a **Default volume boost** for new books.

ListenUp also evens out loudness between books on its own, so you shouldn't have to reach for the volume each time you change book. There's nothing to configure for that.

> [!NOTE]
> In a browser, boost depends on the browser allowing it. When it can't, the boost panel says so.

## Chapters and parts

Open **Chapters** to see the whole list and tap any chapter to play from its start. On a wide screen the list stays open beside the player, with a **Back to current chapter** button if you've scrolled away.

A book's page shows the chapters around where you are, with **All chapters** to expand the list. Tapping a chapter there plays it too.

Books divided into **parts** show each part as a heading across the chapter list, with its chapter count and length. An omnibus shows each **book** it contains the same way. Admins set these in the [chapter editor](/admin/editing/#chapters).

## Auto-rewind

Come back to a book after a break and ListenUp starts a little earlier, so you can pick up the thread:

| Away for | Rewinds |
| --- | --- |
| Under a minute | Nothing |
| Under an hour | 5 seconds |
| Under six hours | 15 seconds |
| Longer | 30 seconds |

It's on by default. Turn it off with **Auto-rewind on resume** in Settings. That setting is kept per device.

## Lock screen, headphones and the car

The lock screen, the notification, Bluetooth controls and your car's display all follow the **current chapter**: the progress bar is the chapter's, and previous and next move by chapter. The second line shows how much of the chapter is left.

## Marking a book yourself

Listened to something elsewhere, or want to start over? A book's **⋯** menu has a **Progress** group:

- **Mark as finished…** records the book as finished, on the day you actually finished it if that wasn't today.
- **Mark as not started…** clears your progress.
- **Restart from the beginning…** keeps the book in progress and goes back to the start.

## Maps, PDFs and other documents

If a book shipped with documents, such as a map or a PDF of illustrations, they're on the book's page. One document opens directly; several are listed under **Maps & illustrations**.

- **Android and iOS** open PDFs in a built-in reader, with a strip that keeps the player in reach. Other document types aren't viewable in the apps yet.
- **Web** opens a PDF in a new tab and downloads anything else.

## Which settings follow you

Default speed, default volume boost, the skip intervals and the default sleep timer are saved to your account and apply on every device. Auto-rewind, haptics and the Wi-Fi-only download setting are kept on each device separately.
