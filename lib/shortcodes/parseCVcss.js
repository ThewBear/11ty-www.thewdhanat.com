const postcss = require("postcss");
const esbuild = require("esbuild");

const postcssPlugins = [require("tailwindcss")({
  content: ["src/cv.njk"],
  theme: {
    fontFamily: {
      body: ['Sarabun', 'sans-serif'],
    },
  }
}), require("autoprefixer")];

module.exports = function parseCVcss(rawCss) {
  const css = postcss(postcssPlugins)
    .process(rawCss, {from: undefined})
    .css;
  return esbuild.transformSync(css, { loader: "css", minify: true }).code;
};
