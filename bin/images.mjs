import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import fg from "fast-glob";
import sharp from "sharp";

const IS_PRODUCTION = process.env.CI === "true";

const images = {};
await fg([
  "_data/awesome/*.png",
  "src/**/*.{jpg,jpeg,png,webp,avif}",
  "!src/static/**/*",
]).then((entries) => entries.forEach((image) => (images[image] = null)));

const widths = IS_PRODUCTION
  ? [400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2400, 2800, null]
  : [null];
const formats = IS_PRODUCTION ? ["avif", "webp", "jpeg"] : ["jpeg"];

await fs.mkdir("_data/images", { recursive: true });

const totalImages = Object.keys(images).length;
Object.keys(images).forEach(async (image, index) => {
  const sharpInstance = sharp(image);
  const metadata = await sharpInstance.metadata();
  const randomString = crypto
    .createHash("sha1")
    .update(image + JSON.stringify(metadata))
    .digest("hex");
  const fileNamePrefix = `${path.basename(
    image,
    path.extname(image)
  )}_${randomString}`;

  images[image] = {
    files: [],
    metadata,
    sources: {},
  };

  formats.forEach((f) => {
    images[image]["sources"][f] = [];
    widths
      .filter((w) => (w === null ? true : w <= metadata.width))
      .forEach((w) => {
        const width = w === null ? metadata.width : w;
        const fileName = `${fileNamePrefix}-${width}.${f}`;
        images[image]["files"].push(fileName);
        images[image]["sources"][f].push(`${fileName} ${width}w`);
        sharpInstance
          .resize(w)
          .toFile(path.join("_data/images", fileName))
          .then(() =>
            console.log(
              `${Date().toString()} : finished ${index + 1}/${totalImages}`,
              f,
              w
            )
          );
      });
  });
  await fs.writeFile("_data/images/data.json", JSON.stringify(images));
});

console.log(images);
