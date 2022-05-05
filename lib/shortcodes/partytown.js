const { partytownSnippet } = require("@builder.io/partytown/integration");
const { copyLibFiles } = require("@builder.io/partytown/utils");
const esbuild = require("esbuild");

copyLibFiles("_site/~partytown");

const snippetText = partytownSnippet();
const minifiedSnippedText = esbuild.transformSync(snippetText).code;

module.exports = function partytown(config) {
  esbuild.transformSync(config).code;
  return `<script>${config}</script><script >${minifiedSnippedText}</script>`;
};
