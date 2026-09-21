+++
title = "Web"
weight = 25
description = "Open ListenUp in a browser — nothing to install"
[params]
eyebrow = "Apps"
lede = "Your server hosts the web client. Open its address in a browser and you are already there."
+++

## It needs HTTPS {#https}

> [!IMPORTANT]
> **The web client only runs on a secure origin: HTTPS, or `localhost`.** Over plain `http://your-host:8080` it loads and then stops with *"This page is not a secure context."*
>
> This is a browser rule, not a ListenUp setting. The client keeps your library in the browser's origin-private file system (OPFS), which needs `SharedArrayBuffer`, which browsers expose only on a trustworthy origin. There is no flag that turns it on.

That matters because ListenUp's recommended setup — plain HTTP on your LAN — is **not** a secure origin. The apps are unaffected and keep working exactly as before; it is only the browser client that needs this.

Three ways to get a secure origin:

- **A reverse proxy with TLS** — Caddy provisions certificates on its own and needs about three lines. See [Reverse proxy & HTTPS](/server/reverse-proxy/).
- **Tailscale** — `tailscale serve` puts an HTTPS certificate in front of your server with no public exposure and no DNS to configure. Often the least work if you already use it to reach your server away from home.
- **`localhost`** — if you browse from the machine running the server, `http://localhost:8080` is a secure origin by definition. Handy for a quick look; not a way to use it from the sofa.

## There is nothing to install

Given a secure origin, the web client ships **inside the server**. If you are running ListenUp, you already have it: open your server's address in a browser and the client is served at `/`.

No app store, no sideloading, no separate download. Updating the server updates the web client with it.

> [!NOTE]
> This is the same library, player, editing and admin surface as the phone apps, not a cut-down remote control. If you can do it on your phone you can very likely do it here.

## Sign in

Exactly as the apps do — you are talking to the same server:

- **Fresh server?** The first account you create becomes the server owner. See [First-run setup](/getting-started/installation/#first-run).
- **Invited by someone?** Open the invite link in the browser and it lands you in the join flow with the server and code already filled in.
- **Already have an account?** Sign in, or register — new sign-ups follow the server's [registration policy](/server/configuration/), an approval queue by default.

There is no server-discovery step here. The page came from your server, so it already knows which one it belongs to.

## What is different from the apps {#differences}

Two real limits, worth knowing before you rely on it:

**No offline downloads.** The phone apps keep your books on the device and play them with no network at all. A browser cannot do that, so the web client **streams**, and playback needs the server reachable. Your library list and reading positions are held locally and survive a refresh — but the audio comes from the server every time.

**Notifications reach your phone, not the tab.** You can change your notification preferences here, and they apply to your account, but the browser tab itself does not receive push.

Everything else is the same, including a couple of things worth calling out:

- **Formats a browser cannot decode play anyway.** The server transcodes them on the fly, so an xHE-AAC book that a browser would refuse still plays. See [Transcoding](/server/configuration/).
- **Your position follows you.** Start a book in the browser, pick it up on your phone mid-sentence, and back again.

## Browser support

Any current Chrome, Edge, Firefox or Safari. The client uses a few recent web APIs, so a browser more than a couple of years old may not load it.

Audio streams as HLS, which Safari plays natively and other browsers play through [hls.js](https://github.com/video-dev/hls.js).

## Turning it off

Some people would rather their server served no web UI at all. Start the container with an empty web root and `/` stops serving anything:

```bash
docker run -e LISTENUP_WEB_ROOT= ...
```

The apps are unaffected — they talk to the API, not the web client.

## Next steps

- **[Installation](/getting-started/installation/)**: setting up the server that hosts this.
- **[Reverse proxy & HTTPS](/server/reverse-proxy/)**: putting the web client on a real domain.
