---
title: How I update my Twitter cover every sunrise and sunset
description: How I automatically update my Twitter profile cover every sunrise and sunset; automation; golang
---

You may notice that [my Twitter](https://twitter.com/ThewDhanat) cover changes every day and night (in my timezone, of course). The images were from Unsplash and Nasa.

**Answer**: I developed https://github.com/ThewApp/auto-twitter-cover and deployed it with Docker 😇.

You can look at the source code. It only has 224 lines.

Previously, I wrote it in Node.js, but last week I rewrote it in [Go](https://go.dev/) 💨. The docker image size reduced from hundreds of MB to 30 MB, and the idle memory usage went down from 50 MB to 6 MB 🤯.
