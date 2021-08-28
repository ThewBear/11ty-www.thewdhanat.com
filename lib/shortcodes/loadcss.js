const fs = require("fs");
const postcss = require("postcss");
const path = require("path");
const esbuild = require("esbuild");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const outDir = "_site";

const parsedCss = {};

const postcssPlugins = require(path.resolve(
  process.cwd(),
  "postcss.config.js"
)).plugins;

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
    minify: true,
    metafile: true,
  });
  const filePath = Object.keys(metafile.outputs)[0].substring(outDir.length);
  return filePath;
}

module.exports = async function loadcss(input) {
  let filePath;
  const lastModified = fs.statSync(input).mtime.getTime();

  if (
    parsedCss[input] &&
    (IS_PRODUCTION || parsedCss[input].lastModified === lastModified)
  ) {
    // Already parsed css file
    filePath = await parsedCss[input].filePath;
  } else {
    // Parse css file
    parsedCss[input] = {
      lastModified,
    };
    parsedCss[input].filePath = parseCss(input);
    filePath = await parsedCss[input].filePath;
  }

  return `<link rel="stylesheet" type="text/css" href="${filePath}" />`;
};
