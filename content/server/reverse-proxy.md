+++
title = "Reverse proxy & HTTPS"
weight = 20
description = "Reach ListenUp over the internet with HTTPS: Caddy, Nginx, and Traefik."
[params]
eyebrow = "Server Setup"
lede = "To reach ListenUp from outside your network, and to serve it over HTTPS, put it behind a reverse proxy."
+++

The server speaks plain HTTP on its `PORT` (default `8080`). A reverse proxy sits in front, terminates TLS, and forwards requests to it. ListenUp keeps connections open for **WebSocket** (live RPC streaming) and **Server-Sent Events** (the cross-device sync feed), so the one thing every proxy config must get right is **letting those streams through without buffering or premature timeouts**.

> [!NOTE]
> A proxy is only needed for access across the public internet. On your home network (or over a VPN like Tailscale), the apps connect straight to `http://your-host:8080`, no proxy or certificate required.

## Caddy

Caddy is the shortest path: it provisions and renews certificates automatically, and proxies WebSocket and SSE correctly out of the box.

```caddyfile {file="Caddyfile"}
listen.example.com {
    reverse_proxy localhost:8080
}
```

## Nginx

Nginx needs a little more: the WebSocket upgrade mapping, and `proxy_buffering off` so SSE messages flush immediately rather than piling up in a buffer.

```nginx {file="nginx.conf"}
# In the http { } block, maps the Upgrade header for WebSockets.
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 443 ssl;
    server_name listen.example.com;

    # ssl_certificate     /path/to/fullchain.pem;
    # ssl_certificate_key /path/to/privkey.pem;

    location / {
        proxy_pass         http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection $connection_upgrade;

        # Server-Sent Events: stream immediately, don't buffer or time out.
        proxy_buffering    off;
        proxy_read_timeout 1h;
    }
}
```

## Traefik

Traefik streams responses without buffering by default, so a standard `Host`-rule router pointed at the container on port `8080` works for both WebSocket and SSE. No special middleware required. Use its built-in ACME resolver for automatic certificates.

## Set the Remote URL

Whichever proxy you use, finish in the app: open **Administration → Settings** and set the **Remote URL** to your public address (`https://listen.example.com`). That's the address ListenUp bakes into invite links and advertises on your network.

> [!TIP]
> There's no base-URL environment variable to set. ListenUp builds media URLs relative to whatever address the app is connected to, so the only thing to configure is the **Remote URL** above, used for invite links and local discovery.
