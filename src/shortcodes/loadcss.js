const fs = require("fs");
const crypto = require("crypto");
const postcss = require("postcss");
const path = require("path");

const parsedCss = {};

module.exports = async function (input) {
  let filePath;

  if (parsedCss[input]) {
    // Already parsed css file
    filePath = parsedCss[input].filePath;
  } else {
    // Parse css file
    const rawCss = fs.readFileSync("src/_styles/index.css");
    const css = await postcss([
      require("tailwindcss"),
      require("autoprefixer"),
      require("cssnano"),
    ])
      .process(rawCss, { from: input })
      .then((result) => result.css);
    const hash = crypto.createHash("md5").update(css).digest("hex");
    const fileName = `${path.basename(input, ".css")}.${hash}.css`;
    try {
      fs.mkdirSync("_site/css", { recursive: true });
    } catch (err) {}
    filePath = `css/${fileName}`;
    parsedCss[input] = {
      filePath,
      hash,
      css,
    };
    fs.writeFileSync(`_site/css/${fileName}`, css);
  }

  return `<link rel="stylesheet" type="text/css" href="${filePath}" />`;
};
