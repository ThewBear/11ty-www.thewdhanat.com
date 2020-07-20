const fs = require("fs");
const crypto = require("crypto");
const Terser = require("terser");
const path = require("path");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const parsedJs = {};

module.exports = async function (input, attributes) {
  let filePath;

  if (parsedJs[input] && IS_PRODUCTION) {
    // Already parsed js file
    filePath = parsedJs[input].filePath;
  } else {
    // Parse js file
    const lastModified = fs.statSync(input).mtime.getTime();
    if (parsedJs[input] && parsedJs[input].lastModified === lastModified) {
      // No js change
      filePath = parsedJs[input].filePath;
    } else {
      // JS changed
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
      parsedJs[input] = {
        lastModified,
        filePath,
        hash,
      };
      fs.writeFileSync(`_site/js/${fileName}`, code);
    }
  }

  return `<script ${attributes} src="${filePath}"></script>`;
};
