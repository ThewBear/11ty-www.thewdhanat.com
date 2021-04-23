const path = require("path");
const Image = require("@11ty/eleventy-img");

const markdownLibrary = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
}).use(require("markdown-it-anchor"));

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const defaultImageRenderer = markdownLibrary.renderer.rules.image;

markdownLibrary.renderer.rules.image = function (
  tokens,
  idx,
  options,
  env,
  self
) {
  const token = tokens[idx];
  const src = token.attrs[token.attrIndex("src")][1];

  if (path.extname(src) === ".gif") {
    return defaultImageRenderer(tokens, idx, options, env, self);
  }

  // https://github.com/markdown-it/markdown-it/blob/df4607f1d4d4be7fdc32e71c04109aea8cc373fa/lib/renderer.js#L101
  token.attrs[token.attrIndex("alt")][1] = self.renderInlineAsText(
    token.children,
    options,
    env
  );

  const baseDir = path.dirname(env.page.inputPath);
  const filePath = path.join(baseDir, src);

  const imageOptions = {
    widths: IS_PRODUCTION
      ? [400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2400, 2800, null]
      : [null],
    formats: IS_PRODUCTION ? ["avif", "webp", "jpeg"] : ["jpeg"],
    outputDir: "_site/static/img",
    urlPath: "/static/img/",
  };

  Image(filePath, imageOptions);

  let imageAttributes = {
    alt: token.attrs[token.attrIndex("alt")][1],
    sizes:
      "(min-width: 1024px) calc(60vw - 3rem), (min-width: 640px) calc(80vw - 3rem), calc(100vw - 3rem)",
    loading: "lazy",
    decoding: "async",
  };
  // get metadata even the images are not fully generated
  metadata = Image.statsSync(filePath, imageOptions);
  return Image.generateHTML(metadata, imageAttributes);
};

module.exports = markdownLibrary;
