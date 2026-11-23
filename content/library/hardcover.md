+++
title = "Hardcover"
weight = 35
description = "Connect a Hardcover account so your listening shows up there, and what you've read elsewhere shows up here."
[params]
eyebrow = "Library"
lede = "Hardcover is a site for tracking what you read. Connect your account and ListenUp keeps the two in step, in both directions."
+++

Hardcover is optional and personal: each member connects their own account, or doesn't. Nothing is sent for anyone who hasn't connected.

## Connecting

Open **Settings → Account → Hardcover** and choose **Connect Hardcover**. It works the same on Android, iOS and the web.

ListenUp opens Hardcover's sign-in page and shows a short code. Approve it there, on this device or another, and you're connected. The code works for about 15 minutes.

> [!NOTE]
> You sign in on Hardcover's own page. ListenUp never sees your password.

## What ListenUp sends to Hardcover

Under **Update Hardcover**, choose how much to share:

- **As I listen** (the default): books you start appear as Currently reading, your progress follows along, and books you finish are marked as read.
- **Only when I finish**: nothing is sent until you finish a book.

When you first connect, ListenUp offers to send the books you'd already finished.

Ratings you give in ListenUp are not sent to Hardcover.

## What comes back

- **Books you read elsewhere** appear in a book's Readers list with a Hardcover label. They never count as listening, so they don't touch your stats or streaks.
- **Your Want to Read list** arrives on your [To Read shelf](/library/shelves/).
- **Ratings you made on Hardcover** fill in where you haven't rated a book in ListenUp. A rating you gave in ListenUp is never overwritten.

## Keeping a book off Hardcover

Every book's page has a Hardcover section with a **Sync with Hardcover** switch. Turn it off and that one book is never sent, whatever your other settings say.

## When a book needs a match

ListenUp links your books to Hardcover's automatically as you start them. When it can't tell which Hardcover book yours is, the book's page says **Needs a match**. Use **Find on Hardcover** to pick the right one, and **Change match** or **Remove match** if it got it wrong.

**Sync now**, on the Hardcover settings screen, runs a sync immediately instead of waiting for the next one.

## For admins

Two settings in **Administration** control Hardcover as a metadata source, separately from anyone's account:

- **API token.** With a token, ListenUp reads Hardcover's catalogue (moods, genres, series and ratings) without borrowing a member's account. It is never used for anyone's shelves. Without one, catalogue lookups go through a connected member's account.
- **Hardcover metadata.** Offers Hardcover's moods, genres, series and descriptions when you [match a book](/library/metadata-matching/). On by default.

To turn Hardcover off for the whole server, set `LISTENUP_HARDCOVER_CLIENT_ID` to an empty value. See [Configuration](/server/configuration/).
