require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "txt",
    "ico",
  ]);
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.svg");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.webp");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.png");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.gif");
  eleventyConfig.addPassthroughCopy({ "cv/*.pdf": "." });

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
  require("./lib/shortcodes/loadcss")(eleventyConfig);

  eleventyConfig.addAsyncShortcode(
    "loadjs",
    require("./lib/shortcodes/loadjs")
  );

  eleventyConfig.addAsyncShortcode(
    "fetchInline",
    require("./lib/shortcodes/fetchInline")
  );

  eleventyConfig.addPairedShortcode(
    "partytown",
    require("./lib/shortcodes/partytown")
  );

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
