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
  const imageData = data[src];
  if (!imageData) return "<div>Image not available</div>";
  const image = new Image(path.join("_data/awesome", imageData.thumbnailFile), {
    imageAttributes: {
      alt,
      sizes,
    },
  });
  return image.getHTML();
}

module.exports = urlThumbnail;
