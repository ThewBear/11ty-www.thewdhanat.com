const twemoji = require("twemoji");

module.exports = function (emoji, className = "") {
  const codePoint = twemoji.convert.toCodePoint(emoji);
  return `<img class="twemoji ${className}" draggable="false" src="${twemoji.base}svg/${codePoint}.svg" alt="${emoji}">`;
};
