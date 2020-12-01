---
title: Introducing Vercel short URL beta
description: Deploy your own short URL to Vercel
postLang: en
---

A few months ago, I [posted on DEV](https://dev.to/thewdhanat/create-your-personal-shorturl-with-vercel-github-actions-4idm) how I setup GitHub Actions to deploy a short URL application to Vercel.

However it requires some complex setup such as token and project secrets management.

Now, I would like to introduce a new version of [vercel-shorturl](https://github.com/ThewApp/vercel-shorturl). In this version, you just clone the [template repository](https://github.com/ThewApp/vercel-shorturl-starter), edit `redirects.yml` and deploy to Vercel.🎉

Or click the below button to deploy to Vercel immediately!😊

<a href="https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FThewApp%2Fvercel-shorturl-starter&demo-title=vercel-shorturl&demo-description=Create%20your%20own%20shorturl%20on%20Vercel&demo-url=https%3A%2F%2Fvercel-shorturl-starter.vercel.app%2F" class="no-external-icon">
<img alt="Deploy with Vercel" src="https://vercel.com/button" />
</a>

With this new version, you can edit your configuration through GitHub web interface and let Vercel GitHub Integration deploy it immediately.❤

## Demo

[Demo](https://vercel-shorturl-starter.vercel.app) is deployed with the example [redirects.yml](https://github.com/ThewApp/vercel-shorturl/blob/Main/assets/redirects.example.yml).

Here is some route you can try:

- [/me](https://vercel-shorturl-starter.vercel.app/me)
- [/google/path-parameters](https://vercel-shorturl-starter.vercel.app/google/path-parameters)
- [/google?action=search&q=some-query](https://vercel-shorturl-starter.vercel.app/google?action=search&q=some-query)
- [/dev?u=thewdhanat](https://vercel-shorturl-starter.vercel.app/dev?u=thewdhanat)

See more supported routing features in the example [redirects.yml](https://github.com/ThewApp/vercel-shorturl/blob/Main/assets/redirects.example.yml).

## Features
### Custom page

You can override home page and 404 page by placing `index.html` and `404.html` in project root.

### Analytics

vercel-shorturl can automatically send an event to [Amplitude](https://amplitude.com/), just set `Amplitude` [environment variable](https://vercel.com/docs/environment-variables) to your HTTP API key.

## Why Vercel?

Because it's easy and free!✨

## Why short URL?

Because it's easy to share and remember. You can set it to your own domain to improve your brand.

