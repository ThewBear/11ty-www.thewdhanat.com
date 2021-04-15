module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "txt",
    "svg",
    "webp",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "ico",
    "webmanifest",
  ]);
  eleventyConfig.addPassthroughCopy("static");

  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));

  /* Markdown Overrides */
  let markdownLibrary = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true,
  }).use(require("markdown-it-anchor"));
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addShortcode("twemoji", require("./src/shortcodes/twemoji"));
  eleventyConfig.addFilter("twemoji", require("./src/filters/twemoji"));
  eleventyConfig.addFilter(
    "readableDate",
    require("./src/filters/readableDate")
  );

  eleventyConfig.addWatchTarget("./src/_styles/");
  eleventyConfig.addAsyncShortcode(
    "loadcss",
    require("./src/shortcodes/loadcss")
  );

  eleventyConfig.addAsyncShortcode(
    "loadjs",
    require("./src/shortcodes/loadjs")
  );

  eleventyConfig.addAsyncShortcode(
    "urlThumbnail",
    require("./src/shortcodes/urlThumbnail")
  );

  eleventyConfig.addCollection(
    "blogByYear",
    require("./src/collections/blogByYear")
  );

  return {
    dir: {
      input: "src",
    },
  };
};
