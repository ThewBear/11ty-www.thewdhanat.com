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

  eleventyConfig.addWatchTarget("./src/_styles/");
  eleventyConfig.addWatchTarget('./tailwind.config.js')
  eleventyConfig.addAsyncShortcode("loadcss", require("./src/shortcodes/loadcss"));
  
  return {
    dir: {
      input: "src",
    },
  };
};
