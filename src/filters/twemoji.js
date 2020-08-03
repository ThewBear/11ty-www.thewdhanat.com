const twemoji = require("twemoji");
const regex = require("twemoji-parser/dist/lib/regex").default;
const UFE0Fg = /\uFE0F/g;

module.exports = function (content) {
  // https://github.com/twitter/twemoji/blob/master/scripts/build.js
  return content.replace(regex, (match) => {
    const codePoint = twemoji.convert.toCodePoint(match.replace(UFE0Fg, ""));
    return `<img class="twemoji" draggable="false" src="${twemoji.base}svg/${codePoint}.svg" alt="${match}">`;
  });
};
