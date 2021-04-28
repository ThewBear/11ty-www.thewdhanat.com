const { chromium } = require("playwright");
const slugify = require("slugify");
const PQueue = require("p-queue").default;
const Image = require("../image");

// process.env.UV_THREADPOOL_SIZE = 2; // https://github.com/lovell/sharp/issues/138
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const cached = [];
let count = 0;
let total = 0;
const queue = new PQueue({ concurrency: 5 });
queue.onIdle(() => {
  if (browserInstance && IS_PRODUCTION) browserInstance.close();
});

let browserInstance;
async function launchBrowser() {
  if (!browserInstance) {
    browserInstance = await chromium.launch();
  }
  return browserInstance;
}

function urlThumbnail(src, alt = "", sizes = "(min-width: 768px) 25vw, 50vw") {
  const slug = slugify(src.replace(/https?:\/\/|[.]/g, ""));
  if (cached[slug]) {
    return cached[slug];
  }

  const imageAttributes = {
    alt,
    sizes,
  };

  const metadata = {
    width: 1440,
    height: 1440 * 2,
    format: "png",
  };

  const randomString = require("crypto").randomBytes(4).toString("hex");
  const thumbnailFile = `_site/_urlThumbnail/${slug}_${randomString}.png`;

  const image = new Image(thumbnailFile, { imageAttributes, metadata });

  queue.add(async () => {
    const browser = await launchBrowser();
    const page = await browser.newPage({
      viewport: {
        width: metadata.width,
        height: metadata.height,
      },
    });
    await page.goto(src);
    await page.waitForTimeout(500);
    await page.screenshot({ path: thumbnailFile, type: metadata.format });
    await page.close();
    console.log(`urlThumbnail ${++count}/${total}`);
    return image.start();
  });
  total++;

  cached[slug] = image.getHTMLSync();

  return cached[slug];
}

module.exports = urlThumbnail;
