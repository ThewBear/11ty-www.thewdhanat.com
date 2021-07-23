import crypto from "crypto";
import fs from "fs/promises";
import data from "../src/awesome/awesome.11tydata.js";
import PQueue from "p-queue";
import slugify from "slugify";
import { chromium } from "playwright";

const queue = new PQueue.default({ concurrency: 5 });
const chrome = await chromium.launch();
queue.on("idle", async () => {
  await chrome.close();
  await fs.writeFile("_data/awesome/data.json", JSON.stringify(pages));
});

const pages = {};

data.contents.forEach((value) => {
  value.forEach((topic) =>
    topic.items.forEach(({ url }) => (pages[url] = null))
  );
});

Object.keys(pages).forEach((url) => {
  if (pages[url]) {
    return pages[url];
  }

  const slug = slugify(url.replace(/https?:\/\/|[.]/g, ""));

  const metadata = {
    width: 1440,
    height: 1440 * 2,
    format: "png",
  };

  const randomString = crypto.randomBytes(4).toString("hex");
  const thumbnailFile = `${slug}_${randomString}.png`;

  queue.add(async () => {
    const page = await chrome.newPage({
      viewport: {
        width: metadata.width,
        height: metadata.height,
      },
    });
    await page.goto(url);
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `_data/awesome/${thumbnailFile}`,
      type: metadata.format,
    });
    await page.close();
  });
  pages[url] = {
    slug,
    thumbnailFile,
  };
});

console.log(pages);
