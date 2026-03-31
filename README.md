# PSH

## Overview

**PSH** is a personal web platform designed as a **playground for my experimental web services**.

## Tech Stack

- **Framework:** Next.js
- **Graphics:** Three.js
- **Styling:** Tailwind CSS
- **Real-time Communication:** WebSocket

---

## Service 1: 3D Multiplayer Space

An interactive virtual environment where visitors can control avatars and interact in real-time.

### Features

- **3D Skeleton Avatar:** Users control a 3D character powered by **Three.js**.
- **Real-time Sync:** Multiple users can see each other's movement simultaneously via **WebSockets**.
- **Responsive Controls:** Optimized navigation for both desktop and mobile devices.

### Architecture

#### Custom Server

I implemented a **Custom Node.js Server** that wraps the Next.js application.

- **HTTP Requests:** Delegated to the Next.js renderer.
- **WebSocket Requests:** Intercepted by the custom server to handle real-time connection upgrades and message broadcasting, enabling multiplayer features with chat.

### Challenges & Learnings

- **Challenge:** Initially, I applied **Linear Interpolation (Lerp)** to smooth out avatar movements. However, tuning the interpolation factor proved difficult, causing the avatar to "rubber-band" or slide excessively.  
  **Learning:** To mitigate this, I increased the **WebSocket transmission frequency** to minimize the gap between updates. While this improved smoothness, it significantly increased network bandwidth usage.

url : 168.107.4.68:4000
---
