import fs from "fs/promises";
import data from "../src/awesome/awesome.11tydata.js";
import PQueue from "p-queue";
import slugify from "slugify";
import { chromium } from "playwright";

const pages = {};

data.contents.forEach((value) => {
  value.forEach((topic) =>
    topic.items.forEach(({ url }) => (pages[url] = null))
  );
});

const queue = new PQueue.default({ concurrency: 5 });
const chrome = await chromium.launch();
queue.on("idle", async () => {
  await chrome.close();
});

await fs.mkdir("_data/awesome", { recursive: true });

const totalPages = Object.keys(pages).length;
Object.keys(pages).forEach((url, index) => {
  if (pages[url]) {
    return pages[url];
  }

  const slug = slugify(url.replace(/https?:\/\/|[.]/g, ""));

  const metadata = {
    width: 1440,
    height: 1440,
    format: "png",
  };

  const thumbnailFile = `${slug}.png`;

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
    console.log(`${Date().toString()} : finished ${index + 1}/${totalPages}`);
  });
  pages[url] = { thumbnailFile };
  if (process.env.GITHUB_RUN_ID) pages[url].version = process.env.GITHUB_RUN_ID;
});

await fs.writeFile("_data/awesome/data.json", JSON.stringify(pages));

console.log(pages);
