const fs = require("fs");
const crypto = require("crypto");
const Terser = require("terser");
const path = require("path");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const parsedJs = {};

async function parseJs(input) {
  const rawJs = fs.readFileSync(input, "utf8");
  const minified = Terser.minify(rawJs);
  let code;
  if (minified.error) {
    console.log("Terser error: ", minified.error);
    code = rawJs;
  } else {
    code = minified.code;
  }
  const hash = IS_PRODUCTION
    ? crypto.createHash("md5").update(code).digest("hex")
    : "dev";
  const fileName = `${path.basename(input, ".js")}.${hash}.js`;
  try {
    fs.mkdirSync("_site/js", { recursive: true });
  } catch (err) {}
  filePath = `/js/${fileName}`;
  fs.writeFileSync(`_site/js/${fileName}`, code);
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
