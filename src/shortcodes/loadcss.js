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

module.exports = async function (input) {
  let filePath;

  if (parsedCss[input] && IS_PRODUCTION) {
    // Already parsed css file
    filePath = parsedCss[input].filePath;
  } else {
    // Parse css file
    const lastModified = fs.statSync(input).mtime.getTime();
    if (parsedCss[input] && parsedCss[input].lastModified === lastModified) {
      // No css change
      filePath = parsedCss[input].filePath;
    } else {
      // CSS changed
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
      filePath = `css/${fileName}`;
      parsedCss[input] = {
        lastModified,
        filePath,
        hash,
      };
      fs.writeFileSync(`_site/css/${fileName}`, css);
    }
  }

  return `<link rel="stylesheet" type="text/css" href="${filePath}" />`;
};
