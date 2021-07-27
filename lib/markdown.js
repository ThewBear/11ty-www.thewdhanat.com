const path = require("path");
const Image = require("./image");

const markdownLibrary = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
}).use(require("markdown-it-anchor"));

const defaultTextRenderer = markdownLibrary.renderer.rules.text;

markdownLibrary.renderer.rules.text = function () {
  const html = defaultTextRenderer(...arguments);
  return require("./filters/twemoji")(html);
};

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
    return defaultImageRenderer(...arguments);
  }

  // https://github.com/markdown-it/markdown-it/blob/df4607f1d4d4be7fdc32e71c04109aea8cc373fa/lib/renderer.js#L101
  token.attrs[token.attrIndex("alt")][1] = self.renderInlineAsText(
    token.children,
    options,
    env
  );

  const baseDir = path.dirname(env.page.inputPath);
  const filePath = path.join(baseDir, src);

  const imageAttributes = {
    alt: token.attrs[token.attrIndex("alt")][1],
    sizes:
      "(min-width: 1024px) calc(60vw - 3rem), (min-width: 640px) calc(80vw - 3rem), calc(100vw - 3rem)",
  };

  const image = new Image(filePath, { imageAttributes });
  return image.getHTML() ?? defaultImageRenderer(...arguments);
};

module.exports = markdownLibrary;
