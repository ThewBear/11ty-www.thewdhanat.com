const fs = require("fs");
const crypto = require("crypto");
const postcss = require("postcss");
const path = require("path");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const parsedCss = {};

const postcssConfig = [
  require("tailwindcss"),
  require("autoprefixer"),
  ...(IS_PRODUCTION ? [require("cssnano")] : []),
];

async function parseCss(input) {
  const rawCss = fs.readFileSync(input);
  const css = await postcss(postcssConfig)
    .process(rawCss, { from: input })
    .then((result) => result.css);
  const hash = IS_PRODUCTION
    ? crypto.createHash("md5").update(css).digest("hex")
    : "dev";
  const fileName = `${path.basename(input, ".css")}.${hash}.css`;
  try {
    fs.mkdirSync("_site/css", { recursive: true });
  } catch (err) {}
  filePath = `/css/${fileName}`;
  fs.writeFileSync(`_site/css/${fileName}`, css);
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
