const path = require("path");
const fs = require("fs");

let data;
try {
  data = JSON.parse(fs.readFileSync("_data/images/data.json"));
} catch {
  data = {};
}

const MIME_TYPES = {
  jpeg: "image/jpeg",
  webp: "image/webp",
  png: "image/png",
  svg: "image/svg+xml",
  avif: "image/avif",
};

class Image {
  constructor(src, { outputDir = "/static/images", imageAttributes, version }) {
    this.src = src;
    this.outputDir = outputDir;
    this.versionString = version ? `?version=${version}` : "";
    this.imageAttributes = Object.assign(
      {
        alt: "",
        sizes: "(min-width: 768px) 25vw, 50vw",
        loading: "lazy",
        decoding: "async",
      },
      imageAttributes
    );
    this.imageData = data[src.replace(/\\/g, "/")];

    if (this.imageData) {
      fs.mkdirSync(path.join("_site", this.outputDir), { recursive: true });
      this.imageData.files.forEach((file) => {
        fs.copyFile(
          path.join("_data/images", file),
          path.join("_site", this.outputDir, file),
          () => {}
        );
      });
    }
  }

  getSrcset(format) {
    return Object.keys(this.imageData.sources[format])
      .map(
        (width) =>
          `${path.join(this.outputDir, this.imageData.sources[format][width])}${
            this.versionString
          } ${width}w`
      )
      .join(", ");
  }

  objectToAttributes(obj, excludes = []) {
    return Object.keys(obj)
      .filter((key) => !excludes.includes(key))
      .map((key) => `${key}="${obj[key]}"`)
      .join(" ");
  }

  getImgTag() {
    if (!this.imageData)
      return `<img src="${this.src}${
        this.versionString
      }" ${this.objectToAttributes(this.imageAttributes)}`;

    const attributesString = this.objectToAttributes(this.imageAttributes, [
      "srcset",
    ]);
    const formats = Object.keys(this.imageData.sources);
    const imgSrc = path.join(
      this.outputDir,
      this.imageData.files[this.imageData.files.length - 1]
    );
    const srcset = this.getSrcset(formats[formats.length - 1]);
    return `<img src="${imgSrc}${this.versionString}" srcset="${srcset}" ${attributesString} width="${this.imageData.metadata.width}" height="${this.imageData.metadata.height}">`;
  }

  getSourcesTag() {
    if (!this.imageData) return "";
    const sources = [];
    const attributesString = this.objectToAttributes(this.imageAttributes, [
      "alt",
      "decoding",
      "loading",
      "srcset",
    ]);
    Object.keys(this.imageData.sources).forEach((format) => {
      const srcset = this.getSrcset(format);
      sources.push(
        `<source type="${MIME_TYPES[format]}" srcset="${srcset}" ${attributesString}>`
      );
    });
    return sources.join("\n");
  }

  getHTML() {
    const img = this.getImgTag();
    const sources = this.getSourcesTag();

    const htmlString = `<picture>
    ${sources}
    ${img}
    </picture>`;
    return htmlString;
  }
}

module.exports = Image;
