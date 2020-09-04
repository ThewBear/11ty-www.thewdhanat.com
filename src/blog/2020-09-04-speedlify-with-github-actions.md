---
title: Monitor Lighthouse score with Speedlify + GitHub Actions
---

[Lighthouse](https://developers.google.com/web/tools/lighthouse) is a tool used by web developers to measure how fast and following best practices the website is. You can run it from your chrome developer tool or [run it online](https://web.dev/measure/). Lighthouse gives you four scoring categories and the score is divided into red, yellow, and green scale. Creating a site that achieves a green score is hard, but maintaining the Lighthouse score is harder. That's why [many services](https://github.com/GoogleChrome/lighthouse#lighthouse-integrations-in-web-perf-services) aim to help you keep track of your web performance.

In this post, I'll introduce you to an open-source project **[Speedlify](https://github.com/zachleat/speedlify)** by [@zachleat](https://twitter.com/zachleat) and how to run it for free using [GitHub Actions](https://github.com/features/actions).

## Speedlify 💯

Speedlify helps you automate Lighthouse running and generate a dashboard for you. You can have a look at [the dashboard for my website](https://speedlify.thewdhanat.com/thewdhanat.com/) for an example.

Speedlify also provides [speedlify-score](https://github.com/zachleat/speedlify-score), a web component that lets you embed the score to your website. I have embedded it at the bottom of [my homepage](/).

## GitHub Actions 🚀

Unlike running with Netlify which limits your build time, my workflow utilizes a generous [free unlimited](https://github.com/features/actions#pricing-details) build time for a public repository. You can monitor hundreds of websites for free! ✨✨

## Code 💻

An example code is in [ThewApp/speedlify-actions](https://github.com/ThewApp/speedlify-actions) repository. You can follow usage steps in the [repository README](https://github.com/ThewApp/speedlify-actions#readme). I have also [submitted](https://dev.to/thewbear/monitor-website-performance-with-speedlify-github-actions-18gp) this repository to [#actionshackathon](https://dev.to/t/actionshackathon) 👩‍💻👨‍💻.

The main workflow file that automates the Lighthouse with Speedlify is at [.github/workflows/test-pages.yml](https://github.com/ThewApp/speedlify-actions). It runs Lighthouse on each site after checking if the configured frequency has passed every hour. The results are stored on the `results` branch in the same repository. It also uploads full results as artifacts that you can [download](https://docs.github.com/en/actions/configuring-and-managing-workflows/persisting-workflow-data-using-artifacts#downloading-and-deleting-artifacts-after-a-workflow-run-is-complete) later.

There is another [workflow file](https://github.com/ThewApp/speedlify-actions/blob/main/.github/workflows/deploy-ghpages.yml) that automatically deploys the dashboard to GitHub Pages. The dashboard will be updated 1 hour after Lighthouse has run. But you can update it manually at any time by [triggering `workflow_dispatch` event](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/).

If you would like to deploy to other hosting providers, I have created [another example that deploys to Vercel](https://github.com/ThewApp/speedlify-actions-vercel).

Feel free to reach me if you need any help. 😉
