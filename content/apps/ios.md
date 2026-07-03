+++
title = "iOS & iPadOS"
weight = 10
description = "Install and connect on iPhone & iPad"
[params]
eyebrow = "Apps"
lede = "Get the ListenUp beta on your iPhone or iPad, connect to your server, and sign in."
+++

## Get the beta

ListenUp for iOS ships through **TestFlight** during the beta. Public invite links are being set up — check the [GitHub Releases page](https://github.com/ListenUpApp/ListenUp/releases) for the current one.

> [!NOTE]
> Beta builds update through TestFlight, not the App Store. You'll get new versions there until ListenUp is ready for a public store release.

## Connect to your server {#connect}

{{< steps >}}

{{< step "Find your server" >}}
On first launch, ListenUp looks for servers on your local network via **mDNS/Bonjour** and lists what it finds under "On your network." Pick yours and continue.
{{< /step >}}

{{< step "Or enter it manually" >}}
If your server doesn't show up — bridge networking, a different network, or a reverse proxy in front of it — use manual entry to type the address directly (for example `http://your-host:8080`). See [Networking & discovery](/getting-started/installation/#networking) for why discovery sometimes can't reach the server.
{{< /step >}}

{{< /steps >}}

## Sign in

Three ways to get into a server, depending on your situation:

- **Fresh server?** The first account you create becomes the server owner. See [First-run setup](/getting-started/installation/#first-run).
- **Invited by someone?** Open the invite link on your phone and it lands you directly in the join flow, with the server and an invite code already filled in. A code can also be typed in by hand.
- **Already have an account?** Sign in, or register a new one — new sign-ups follow the server's [registration policy](/server/configuration/), an approval queue by default.

## Next steps

- **[Downloads & storage](/apps/downloads-and-storage/)**: how offline listening and on-device storage work.
- **[Installation](/getting-started/installation/)**: setting up the server itself.
