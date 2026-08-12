+++
title = "Password Reset"
weight = 20
description = "Approve reset requests and hand over the one-time code yourself — no reset emails, by design."
[params]
eyebrow = "Administration"
lede = "ListenUp doesn't send password reset emails. When someone forgets their password, you approve their request and give them a short code directly — and that handoff is the identity check."
numberedSteps = true
+++

Most apps reset passwords over email. A self-hosted server has no mail service to send from — and for a library shared with family and friends, it doesn't need one. You already know the people on your server. So ListenUp routes recovery through **you**: the person asks for a reset in the app, you approve it, and you pass them a short code **out of band** — by phone, in person, or a chat you already use.

That last step isn't a workaround. Handing over the code yourself is what proves the request came from the real person and not someone typing their email into the login screen.

{{< platform-toggle >}}

## What the person sees

Anyone who forgets their password taps **Forgot password?** on the sign-in screen, enters the email on their account, and lands on a waiting screen while the request comes to you.

{{< shots >}}
{{< shot android="forgot-request-android.png" caption="Requesting a reset" >}}
{{< shot android="forgot-waiting-android.png" caption="Waiting for approval" >}}
{{< /shots >}}

The screen checks for your decision automatically, with a **Check Status** button as a manual fallback. They can close the app while they wait — the request survives.

> [!NOTE]
> A request stays live for **15 minutes** — short enough to bound exposure, long enough to make a phone call. If it expires before you get to it, they just tap **Forgot password?** again.

## Approving a request

Open **Administration** and look for the **Password resets** section. Pending requests appear there with approve and deny actions.

{{< shots >}}
{{< shot android="admin-reset-list-android.png" caption="A pending request" >}}
{{< shot android="admin-reset-code-android.png" caption="The one-time code" >}}
{{< /shots >}}

Approving shows an 8-character one-time code like `YGFD-NBRW`, built from characters that are easy to read aloud.

> [!WARNING]
> The code is shown **exactly once** — there is no way to look it up again. If it slips away before you've passed it on, deny nothing and panic not: the person can simply request a new reset.

Now the important part: **give the code to the person yourself** — call them, tell them in person, or use a chat you already share. Don't relay it through anyone else, and never through ListenUp itself. If the "user" who just asked you for a reset isn't the person you expected to hear from, you've caught exactly the situation this flow exists to catch — deny the request.

## Finishing up

Once approved, the waiting screen moves on by itself: the person types in the code and picks a new password.

{{< shots >}}
{{< shot android="forgot-code-android.png" caption="Code and new password" >}}
{{< /shots >}}

Spacing and dashes in the code don't matter — `YGFD NBRW`, `ygfd-nbrw`, and `YGFDNBRW` all arrive as the same code. There's a budget of **5 attempts**; spending it (or letting the 15 minutes run out) kills the request, and they start over with a fresh one.

When the reset completes, the account is **signed out everywhere**. Old sessions on other devices don't survive a password they no longer know.

## If you're the one locked out

The server owner has no admin above them to approve a request, so the root account gets a different door — one that requires access to the server itself:

{{< steps >}}

{{< step "Arm the reset" >}}
Restart the server with [`LISTENUP_ROOT_RESET=true`](/server/configuration/) set.
{{< /step >}}

{{< step "Read the token from the log" >}}
The startup log prints a prominent banner with a one-time token. The hatch stays open for **15 minutes** and the token works **once**.
{{< /step >}}

{{< step "Reset from the sign-in screen" >}}
While the reset is armed, a **Reset root password** button appears at the bottom of the app's sign-in screen — it's hidden the rest of the time. Tap it, enter the token, and choose a new password.
{{< /step >}}

{{< step "Disarm it again" >}}
Remove `LISTENUP_ROOT_RESET` and restart. Leaving it set re-arms the hatch — with a fresh token — on every boot.
{{< /step >}}

{{< /steps >}}

{{< shots >}}
{{< shot android="root-reset-android.png" caption="The root escape hatch" >}}
{{< /shots >}}

> [!NOTE]
> The flag alone grants nothing: without the token from the log, the hatch won't open. Anyone who can set the variable and read your logs already has full access to the server, so this door is no weaker than the host it's cut into.

{{< done-card title="Recovery, covered" link="/admin/collections/" linktext="Collections" >}}
While you're in the Administration pane — collections decide who sees what.
{{< /done-card >}}
