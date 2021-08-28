const fs = require("fs");
const esbuild = require("esbuild");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const outDir = "_site";

const parsedJs = {};

async function parseJs(input) {
  const { metafile } = await esbuild.build({
    entryPoints: [input],
    outdir: `${outDir}/js`,
    entryNames: IS_PRODUCTION ? "[dir]/[name].[hash]" : "[dir]/[name].dev",
    bundle: true,
    minify: true,
    metafile: true,
  });
  const filePath = Object.keys(metafile.outputs)[0].substring(outDir.length);
  return filePath;
}

module.exports = async function loadjs(input, attributes) {
  let filePath;
  const lastModified = fs.statSync(input).mtime.getTime();

  if (
    parsedJs[input] &&
    (IS_PRODUCTION || parsedJs[input].lastModified === lastModified)
  ) {
    // Already parsed js file
    filePath = await parsedJs[input].filePath;
  } else {
    // Parse js file
    parsedJs[input] = {
      lastModified,
    };
    parsedJs[input].filePath = parseJs(input);
    filePath = await parsedJs[input].filePath;
  }

  return `<script ${attributes} src="${filePath}"></script>`;
};
