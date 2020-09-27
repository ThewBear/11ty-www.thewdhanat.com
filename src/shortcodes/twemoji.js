const twemoji = require("twemoji");
const regex = require("twemoji-parser/dist/lib/regex").default;
const UFE0Fg = /\uFE0F/g;

module.exports = function (emoji, { className = "", alt = true } = {}) {
  // https://github.com/twitter/twemoji/blob/master/scripts/build.js
  return emoji.match(regex).reduce((prev, curr) => {
    const codePoint = twemoji.convert.toCodePoint(
      curr.indexOf("\u200D") >= 0 ? curr : curr.replace(UFE0Fg, "")
    );
    return (
      prev +
      `<img class="twemoji ${className}" draggable="false" src="${
        twemoji.base
      }svg/${codePoint}.svg" alt="${alt ? curr : ""}">`
    );
  }, "");
};
