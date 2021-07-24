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
  eleventyConfig.setLibrary("md", require("./lib/markdown"));

  eleventyConfig.addShortcode("twemoji", require("./lib/shortcodes/twemoji"));
  eleventyConfig.addFilter("twemoji", require("./lib/filters/twemoji"));
  eleventyConfig.addFilter(
    "readableDate",
    require("./lib/filters/readableDate")
  );

  eleventyConfig.addWatchTarget("./src/_styles/");
  eleventyConfig.addAsyncShortcode(
    "loadcss",
    require("./lib/shortcodes/loadcss")
  );

  eleventyConfig.addAsyncShortcode(
    "loadjs",
    require("./lib/shortcodes/loadjs")
  );

  eleventyConfig.addShortcode("awesome", require("./lib/shortcodes/awesome"));

  eleventyConfig.addCollection(
    "blogByYear",
    require("./lib/collections/blogByYear")
  );

  return {
    dir: {
      input: "src",
    },
  };
};
