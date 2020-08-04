module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "txt",
    "svg",
    "png",
    "jpg",
    "jpeg",
  ]);
  eleventyConfig.addPassthroughCopy("static");

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
