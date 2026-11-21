+++
title = "People & permissions"
weight = 5
description = "Roles, permissions, invites, who can join, and what to do when someone forgets a password."
[params]
eyebrow = "Administration"
lede = "Who is on your server, what each person may do, how new people get in, and how to get someone back in when they're locked out."
+++

## Roles

Everyone on a server is one of three things:

- **Owner**: the first account created. It can do everything, and can't be demoted or deleted.
- **Admin**: can do everything too, including managing other people.
- **Member**: can listen, rate and keep shelves, plus whatever permissions you grant.

## Permissions

Permissions decide what a **member** may change. Owners and admins always have all of them.

| Permission | Lets a member | By default |
| --- | --- | --- |
| **Edit metadata** | Fix titles, covers, chapters and matches, and edit people, series, genres, tags and moods | On |
| **Curate library** | Merge, unmerge and delete people, series, genres, tags and moods | Off |

Rather than setting each one, pick a **preset**: **Listener** (changes nothing), **Contributor** (the default: edits, but doesn't merge or delete), or **Librarian** (both). **Custom** is whatever you set by hand.

Set them per person: open **Administration**, choose the person, then **Role and permissions**.

> [!NOTE]
> Permissions cover the library's details. Who can *see* a book is a separate question, answered by [Collections](/admin/collections/).

## Who can join {#registration}

The **Registration** setting in Administration has three positions:

| Setting | What happens when someone registers |
| --- | --- |
| **Open** | They're in straight away. |
| **Approval** (the default) | Their account waits until an admin approves it. |
| **Closed** | Nobody can register. People join by invite only. |

On the web the same three are worded "Anyone can join," "Anyone can ask, you approve," and "Invite only."

Waiting accounts appear under **Pending registrations**. If you have notifications on, you'll get one with **Approve** and **Deny** buttons.

`LISTENUP_REGISTRATION_POLICY` sets the starting value; once you change the setting in the app, the app's value wins.

## Invites

An invite lets a specific person in without waiting for approval, whatever the registration setting.

In **Administration → Invite someone**, enter their name and email, choose whether they join as a **Member** or an **Admin**, and pick how long the invite lasts: 1, 7 or 30 days. You get a link to send them.

- On a phone with ListenUp installed, the link opens the app with the server and code filled in.
- The code can also be typed by hand, in the apps or the web client, under **Have an invite code?**

Each invite works once. Unused invites are listed under **Pending invites**, where you can revoke them.

> [!TIP]
> Set the **Remote URL** in server settings before inviting someone outside your home. Invite links carry that address, so the person's app knows where to find your server. See [Reverse proxy & HTTPS](/server/reverse-proxy/).

## When someone forgets their password {#forgot-password}

A self-hosted server has no email service, so a person handles this instead.

{{< steps >}}

{{< step "They ask" >}}
On the sign-in screen they choose **Forgot password?** and enter their email. The app always says the request was sent, whether or not that email has an account.
{{< /step >}}

{{< step "You approve" >}}
The request appears under **Administration → Password resets**. Approve it and you're shown a short code, once.
{{< /step >}}

{{< step "You pass on the code" >}}
Give them the code yourself: in person, by phone, or in a chat you already use. That step is the security: only someone you'd recognise gets it.
{{< /step >}}

{{< step "They choose a new password" >}}
They enter the code and a new password on the device they asked from. The code lasts 15 minutes and allows five attempts. Every other device signed in to that account is signed out.
{{< /step >}}

{{< /steps >}}

## When the owner is locked out {#root-reset}

If the owner forgets their password there may be nobody left to approve a reset. For that there's an escape hatch that needs access to the server itself.

1. Set `LISTENUP_ROOT_RESET=true` and restart the server.
2. Read the container's output (`docker logs listenup`). It prints a one-time token, valid for 15 minutes. The token is never written to the log file.
3. In the **Android app**, the sign-in screen now shows **Reset root password**. Enter the token and a new password.
4. **Remove the variable and restart.** Left in place, it arms a fresh token every time the server starts.

> [!WARNING]
> Anyone who can set that variable can take over the owner account. That's by design: they already control the machine. It's also why the variable shouldn't stay set.

## Devices

Under **Settings → Account → Devices**, each person sees everywhere they're signed in: this device, and the others with their name, system and when they were last used.

**Sign out device** ends that device's session and removes its downloads. **Sign out all other devices** does the same for everything except the one in your hand, which is what to reach for after losing a phone.
