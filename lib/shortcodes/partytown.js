const { partytownSnippet } = require("@qwik.dev/partytown/integration");
const { copyLibFiles } = require("@qwik.dev/partytown/utils");
const esbuild = require("esbuild");

copyLibFiles("_site/~partytown");

const snippetText = partytownSnippet();
const minifiedSnippedText = esbuild.transformSync(snippetText, {
  minify: true,
}).code;

module.exports = function partytown(config) {
  return `<script>${config}</script><script >${minifiedSnippedText}</script>`;
};
