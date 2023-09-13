const fs = require("fs");
const postcss = require("postcss");
const path = require("path");
const esbuild = require("esbuild");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const outDir = "_site";

let parsedCss = {};

const postcssPlugins = require(
  path.resolve(process.cwd(), "postcss.config.js"),
).plugins;

async function parseCss(input) {
  const rawCss = fs.readFileSync(input);
  const css = await postcss(postcssPlugins)
    .process(rawCss, { from: input })
    .then((result) => result.css);
  const name = path.basename(input, ".css");

  const { metafile } = await esbuild.build({
    stdin: {
      contents: css,
      sourcefile: input,
      loader: "css",
    },
    outdir: `${outDir}/css`,
    entryNames: IS_PRODUCTION ? `[dir]/${name}.[hash]` : `[dir]/${name}.dev`,
    outbase: "src",
    minify: IS_PRODUCTION ? true : false,
    metafile: true,
  });
  const filePath = Object.keys(metafile.outputs)[0].substring(outDir.length);
  return filePath;
}

async function loadcss(input) {
  let filePath;

  if (parsedCss[input]) {
    // Already parsed css file
    filePath = await parsedCss[input].filePath;
  } else {
    // Parse css file
    parsedCss[input] = {
      filePath: parseCss(input),
    };
    filePath = await parsedCss[input].filePath;
  }

  return `<link rel="stylesheet" type="text/css" href="${filePath}" />`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addAsyncShortcode("loadcss", loadcss);
  // Clear parsed css file every time Eleventy starts building
  eleventyConfig.on("beforeBuild", () => {
    parsedCss = {};
  });
};
