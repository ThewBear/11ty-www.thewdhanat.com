const { chromium } = require("playwright");
const slugify = require("slugify");
const Image = require("@11ty/eleventy-img");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const cached = {};

class Browser {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async getPage() {
    if (this.page) return this.page;
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage({
      deviceScaleFactor: IS_PRODUCTION ? 2 : 1,
      viewport: {
        width: 1440,
        height: IS_PRODUCTION ? 1440 * 2 : 1440,
      },
    });
    return this.page;
  }
}

const browser = new Browser();

module.exports = async function urlThumbnail(
  src,
  alt = "",
  sizes = "(min-width: 768px) 50vw, 50vw"
) {
  const slug = slugify(src.replace(/https?:\/\/|[.]/g, ""));
  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // Use cached metadata
  if (cached[slug]) {
    return Image.generateHTML(cached[slug], imageAttributes);
  }

  // Capture new screenshot
  const thumbnailFile = `_site/_urlThumbnail/${slug}.png`;
  const page = await browser.getPage();
  await page.goto(src);
  await page.screenshot({ path: thumbnailFile });

  // Generate optimized image
  const metadata = await Image(thumbnailFile, {
    widths: IS_PRODUCTION ? [400, 800, 1200, 1600, 2000, null] : [null],
    formats: IS_PRODUCTION ? ["avif", "webp", "jpeg"] : ["jpeg"],
    outputDir: "_site/img",
  });

  // Save cache
  cached[slug] = metadata;

  return Image.generateHTML(metadata, imageAttributes);
};
