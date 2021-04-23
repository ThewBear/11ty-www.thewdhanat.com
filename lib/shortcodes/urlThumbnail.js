const { chromium } = require("playwright");
const slugify = require("slugify");
const Image = require("@11ty/eleventy-img");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

// process.env.UV_THREADPOOL_SIZE = 2; // https://github.com/lovell/sharp/issues/138

class ThumbnailGenerator {
  constructor() {
    this.screenshotWidth = 1440;
    this.screenshotHeight = this.screenshotWidth * 2;
    this.imageOptions = {
      widths: !IS_PRODUCTION ? [400, 600, 800, 1000, 1200, null] : [null],
      formats: IS_PRODUCTION ? ["avif", "webp", "jpeg"] : ["jpeg"],
      outputDir: "_site/static/img",
      urlPath: "/static/img/",
    };
    this.cached = {};
  }

  async capture(src, thumbnailFile) {
    if (!this.browser) {
      this.browser = chromium.launch();
    }
    const browser = await this.browser;
    const page = await browser.newPage({
      viewport: {
        width: this.screenshotWidth,
        height: this.screenshotHeight,
      },
    });
    await page.goto(src);
    await page.waitForTimeout(500);
    await page.screenshot({ path: thumbnailFile });
    await page.close();
    await Image(thumbnailFile, this.imageOptions);
    if (browser.contexts().length === 0) {
      await browser.close();
    }
  }

  async shortcode(src, alt = "", sizes = "(min-width: 768px) 25vw, 50vw") {
    const slug = slugify(src.replace(/https?:\/\/|[.]/g, ""));
    const imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    if (this.cached[slug]) {
      return Image.generateHTML(this.cached[slug], imageAttributes);
    }

    const randomString = require("crypto").randomBytes(4).toString("hex");
    const thumbnailFile = `_site/_urlThumbnail/${slug}_${randomString}.png`;

    const metadata = Image.statsByDimensionsSync(
      thumbnailFile,
      this.screenshotWidth,
      this.screenshotHeight,
      this.imageOptions
    );
    this.cached[slug] = metadata;

    this.capture(src, thumbnailFile);

    return Image.generateHTML(metadata, imageAttributes);
  }
}

const generator = new ThumbnailGenerator();

module.exports = (...args) => generator.shortcode(...args);
