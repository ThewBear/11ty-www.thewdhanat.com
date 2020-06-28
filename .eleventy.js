module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "svg",
    "png",
    "jpg",
    "jpeg",
  ]);
  eleventyConfig.addPassthroughCopy("static");

  eleventyConfig.addShortcode("twemoji", require("./src/shortcodes/twemoji"));
  eleventyConfig.addAsyncShortcode("loadcss", require("./src/shortcodes/loadcss"));

  return {
    dir: {
      input: "src",
    },
  };
};
