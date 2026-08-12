+++
title = "Privacy Policy"
description = "ListenUp Privacy Policy"
layout = "standalone"
+++

**Effective Date:** December 28, 2025

**Last Updated:** August 12, 2026

Calypsan Inc. ("we," "our," or "us") provides ListenUp, a self-hosted audiobook server and client application. This Privacy Policy explains how we handle information in connection with the ListenUp mobile applications for Android and iOS, however they are distributed.

## The Simple Truth

ListenUp is a self-hosted application. This means:

- **Your server, your data.** All audiobook files, listening progress, user accounts, and personal information are stored on servers that you own and operate.
- **We never see your library data.** The ListenUp app connects directly to your self-hosted server for everything about your audiobooks, accounts, and listening — that data never passes through our systems. The one exception is optional push notifications, which route through a relay we operate that stores and logs nothing about them; see [Push Notifications](#push-notifications) below.
- **We don't collect analytics.** The app contains no tracking, analytics, or telemetry that reports back to us.

## Information We Collect

**We collect no personal information through the ListenUp application.**

The app does not:
- Collect or transmit usage analytics
- Track your listening habits
- Access your contacts, location, or other device data
- Include third-party advertising or tracking SDKs
- Require account creation with Calypsan Inc.

## Information Stored on Your Server

When you use ListenUp with a self-hosted server, that server stores information necessary for the application to function, including:

- User account credentials (stored with industry-standard encryption)
- Audiobook metadata and files
- Listening progress and bookmarks
- Application preferences

**This data is entirely under your control.** You determine where it's stored, who has access, and how long it's retained. We have no access to your server or its contents.

## Information Stored on Your Device

The ListenUp app stores data locally on your device to enable offline listening and improve performance:

- Downloaded audiobook files
- Cached cover artwork
- Authentication tokens for your server connection
- Local playback preferences

This data remains on your device and is not transmitted to us.

## Third-Party Services

The ListenUp app may optionally connect to third-party services for metadata enrichment (such as book information and cover art). These connections are:

- Initiated only at your request
- Made directly from your device or server to the third-party service
- Subject to the privacy policies of those respective services

We do not receive any information from these interactions.

## Push Notifications

ListenUp can send push notifications for time-sensitive, person-to-person events — such as an admin approving your registration, or an invitation to a shared listening session. Push is optional and can be turned off.

Because the apps are distributed through the App Store and Google Play, the credentials required to deliver a push are tied to our published builds and cannot live on your self-hosted server. A notification therefore takes three hops:

1. **Your server** stores your devices' push tokens and decides when and to whom to send.
2. **Our relay** (`push.listenup.audio`) forwards the request to the platform push service. It is a stateless forwarder that **stores and logs nothing** — not your tokens, not the payload, not its contents — and never interprets what a notification means.
3. **The platform push service** — **Google Firebase Cloud Messaging (FCM)** on Android and **Apple Push Notification service (APNs)** on iOS — delivers the notification to your device. Google and Apple are independent third parties who process this data under their own privacy policies.

A notification payload contains **only an event type and opaque identifiers (randomly generated UUIDs) — never names, titles, or message text.** Your app resolves those identifiers and renders the readable notification **on your device**, from data it already holds. To our relay, and to Google and Apple in transit, the payload is meaningless noise.

What necessarily leaves your device is your device's push token and the timing and type of notifications, which the platform provider (Google or Apple) can see and may retain under its own policy. We keep none of it.

**Your choices.** Push notifications are enabled by default, so a freshly set-up server sends device tokens to our relay unless push is disabled. Your self-hosted server controls this, in two ways. An administrator can turn push off at runtime in the server's settings (Admin → Settings in the app), and the operator can disable it outright at deploy time by setting `LISTENUP_PUSH_ENABLED=false` in the server's configuration — a hard switch that overrides the in-app toggle. Either one stops the server from registering device tokens or contacting our relay, so no token ever reaches us. Because the relay is open source ([github.com/ListenUpApp/relay](https://github.com/ListenUpApp/relay)), a self-hoster can also run their own relay instead of ours. You can additionally use your operating system's notification settings to control whether notifications appear on your device — though note that the server-side controls above are what stop the underlying token exchange.

## Children's Privacy

ListenUp does not collect personal information from anyone, including children under 13. Since all data is stored on user-controlled servers, parents and guardians maintain complete control over any information related to children in their household.

## Data Security

Because ListenUp is self-hosted, data security is in your hands. The application implements security best practices including:

- Encrypted authentication tokens
- Secure password storage using Argon2
- HTTPS support for server connections

We recommend following security best practices for your self-hosted server.

## Changes to This Policy

We may update this Privacy Policy from time to time. We will notify users of any material changes by updating the "Last Updated" date and, where appropriate, through the application or our website.

## Your Rights

Since we don't collect your data, there's nothing for us to provide, correct, or delete. You have complete control over your data on your own server.

## Contact Us

If you have questions about this Privacy Policy, please contact us at:

**Calypsan Inc.**

Email: dev@calypsan.com

---

*ListenUp is built on a simple principle: your audiobooks, your server, your data. We believe privacy isn't a feature. It's a right.*
