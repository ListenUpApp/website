+++
title = "First Steps"
weight = 1
description = "Getting started with your new ListenUp server"
[params]
eyebrow = "Library"
lede = "Your server's running, now connect the app, create your account, and point ListenUp at your audiobooks."
+++

With the server up, the rest happens in the app. Three quick steps: connect, create your account, and add your library.

## Connect to your server

Open ListenUp on your phone. On the same network, it finds your server automatically over mDNS (Bonjour), just pick it from the list.

> [!TIP]
> If the app was already open before you started the server, tap refresh to make it appear.

{{< screenshots "server-select-ios.png" "server-select-android.png" >}}

If your server lives outside your local network, or auto-discovery doesn't find it, tap **Enter Server Manually** and type in its domain or IP address.

{{< screenshots "manual-server-ios.png" "manual-server-android.png" >}}

## Create your account

Once you're connected, ListenUp takes you to a registration screen. The first account created on a new server automatically becomes its **owner**, with full admin control over users, libraries, and settings.

{{< screenshots "create-admin-ios.png" "create-admin-android.png" >}}

> [!NOTE]
> Email is currently used only for signing in, but we plan to add email-based features later, so we recommend you use a real address rather than a throwaway.

## Add your library

There are two ways to tell ListenUp where your audiobooks live:

1. Set the `LISTENUP_LIBRARY_PATH` environment variable at startup (see the [Configuration reference](/server/configuration/)).
2. Pick the folders in the app.

If you didn't set the environment variable, ListenUp drops you at a folder picker. Add each folder that contains audiobooks.

{{< screenshots "folder-picker-ios.png" "folder-picker-android.png" >}}

When you've added your folders, tap **Create library** to kick off the first scan.

{{< screenshots "library-scanner-ios.png" "library-scanner-android.png" >}}

> [!TIP]
> Scanning runs in two phases: **Scanning**, then **Persisting**. Depending on your library's size and your hardware it can take a few minutes; no need to babysit it.

That's it! your library is ready to browse. Curious how ListenUp turns your folders into books? See [Folder structure](/library/folder-structure/).
