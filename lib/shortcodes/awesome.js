const fs = require("fs");
const path = require("path");
const Image = require("../image");
let data;
try {
  data = JSON.parse(fs.readFileSync("_data/awesome/data.json"));
} catch {
  data = {};
}

function urlThumbnail(src, alt = "", sizes = "(min-width: 768px) 25vw, 50vw") {
  const fallback = "<div>Image not available</div>";
  const { thumbnailFile, version = "dev" } = data[src] || {};
  if (!thumbnailFile) return fallback;
  const image = new Image(path.join("_data/awesome", thumbnailFile), {
    imageAttributes: {
      alt,
      sizes,
    },
    version,
  });
  return image.getHTML() ?? fallback;
}

module.exports = urlThumbnail;
