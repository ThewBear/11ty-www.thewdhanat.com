const twemoji = require("twemoji");
const regex = require("twemoji-parser/dist/lib/regex").default;
const UFE0Fg = /\uFE0F/g;

const TWEMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/";

module.exports = function (content) {
  // https://github.com/twitter/twemoji/blob/master/scripts/build.js
  return content.replace(regex, (match) => {
    const codePoint = twemoji.convert.toCodePoint(
      match.indexOf("\u200D") >= 0 ? match : match.replace(UFE0Fg, ""),
    );
    return `<img class="twemoji" draggable="false" src="${TWEMOJI_BASE}svg/${codePoint}.svg" alt="${match}">`;
  });
};
