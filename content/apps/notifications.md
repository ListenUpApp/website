+++
title = "Notifications"
weight = 40
description = "What ListenUp notifies you about, how to choose, and what passes through the push relay."
[params]
eyebrow = "Apps"
lede = "ListenUp sends few notifications, and you choose each kind separately."
+++

## What you can be notified about

| Notification | Who gets it |
| --- | --- |
| **Registration decisions** | Someone waiting to join, when an admin approves or declines. |
| **Pending registrations** | Admins, when someone asks to join. It carries **Approve** and **Deny** buttons. |
| **Campfire invites** | You, when someone invites you to listen together. |

## Choosing

Each kind has two switches under **Settings → Notifications**: **In-app** and **Push**. Both are on to begin with.

- **In-app** notifications collect behind the bell.
- **Push** notifications reach your phone or tablet even when the app is closed.

On the web you can read the inbox and change these switches, and they apply to your account everywhere. Push itself arrives on your phone, not in the browser tab.

## How push reaches you

Phones only accept push through Apple's and Google's services, and those only accept it from an app's publisher. So your server hands each notification to a small relay we run, which passes it on.

What goes through the relay is the kind of notification and some random identifiers. Names, titles and message text are never included; your app fills those in on the device from what it already has. The relay stores and logs nothing. The [privacy policy](/privacy-policy/) has the full account.

## Turning push off for a whole server

Admins can switch off **Push notifications** in server settings.

Running your own relay is also possible: point `LISTENUP_PUSH_RELAY_URL` at it. See [Configuration](/server/configuration/).
