const { chromium } = require("playwright");
const slugify = require("slugify");
const Image = require("@11ty/eleventy-img");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

// process.env.UV_THREADPOOL_SIZE = 2; // https://github.com/lovell/sharp/issues/138

const cached = {};

module.exports = async function urlThumbnail(
  src,
  alt = "",
  sizes = "(min-width: 768px) 25vw, 50vw"
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
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 1440 * 2,
    },
  });
  await page.goto(src);
  await page.screenshot({ path: thumbnailFile });
  await browser.close();

  // Generate optimized image
  const metadata = await Image(thumbnailFile, {
    widths: IS_PRODUCTION ? [400, 800, 1200, null] : [null],
    formats: IS_PRODUCTION ? ["avif", "webp", "jpeg"] : ["jpeg"],
    outputDir: "_site/img",
  });

  // Save cache
  cached[slug] = metadata;

  return Image.generateHTML(metadata, imageAttributes);
};
