const twemoji = require("twemoji");

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

  // twemoji
  eleventyConfig.addShortcode("twemoji", function(emoji, className="") {
    const codePoint = twemoji.convert.toCodePoint(emoji)
    return `<img class="twemoji ${className}" draggable="false" src="${twemoji.base}svg/${codePoint}.svg" alt="${emoji}">`;
  });

  return {
    dir: {
      input: "src",
    },
  };
};
