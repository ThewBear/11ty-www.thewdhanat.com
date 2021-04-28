const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const sharp = require("sharp");
const PQueue = require("p-queue").default;

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const MIME_TYPES = {
  jpeg: "image/jpeg",
  webp: "image/webp",
  png: "image/png",
  svg: "image/svg+xml",
  avif: "image/avif",
};

const queue = new PQueue({ concurrency: 2 });
let count = 0;
let total = 0;

const caches = [];
const placeholders = [];

class Image {
  constructor(src, { options, imageAttributes, metadata }) {
    this.src = src;
    this.options = Object.assign(
      {
        widths: IS_PRODUCTION
          ? [
              200,
              400,
              600,
              800,
              1000,
              1200,
              1400,
              1600,
              1800,
              2000,
              2400,
              2800,
              null,
            ]
          : [null],
        formats: IS_PRODUCTION ? ["avif", "webp", "jpeg"] : ["jpeg"],
        outputDir: "_site/static/img",
        outputFile: crypto.createHash("md5").update(src).digest("hex"),
        urlPath: "/static/img/",
      },
      options
    );
    this.imageAttributes = Object.assign(
      {
        alt: "",
        sizes: "(min-width: 768px) 25vw, 50vw",
        loading: "lazy",
        decoding: "async",
      },
      imageAttributes
    );
    this.sharp = sharp(src, this.options.sharp);
    if (metadata) this.parseMetadata(metadata);
    this.started = false;
  }

  getCacheKey() {
    return (
      this.src + JSON.stringify(this.options) + JSON.stringify(this.metadata)
    );
  }

  placeholder() {
    const holder = `imagePlaceholder ${this.options.outputFile}`;
    placeholders.push({ regex: new RegExp(holder, "g"), image: this });
    return holder;
  }

  getFilename(w, f) {
    return `${this.options.outputFile}-${w}.${f}`;
  }

  getFileSrc(w, f) {
    return path.join(this.options.urlPath, this.getFilename(w, f));
  }

  getSrcset(format) {
    return this.widths
      .map((w) => `${this.getFileSrc(w, format)} ${w}w`)
      .join(", ");
  }

  objectToAttributes(obj, excludes = []) {
    return Object.keys(obj)
      .filter((key) => !excludes.includes(key))
      .map((key) => `${key}="${obj[key]}"`)
      .join(" ");
  }

  parseMetadata(metadata) {
    this.metadata = metadata;
    this.widths = this.options.widths.filter(
      (width) => width !== null && width <= metadata.width
    );
    this.formats = this.options.formats.filter((format) =>
      Object.keys(MIME_TYPES).includes(format)
    );
    if (
      this.options.widths.includes(null) &&
      !this.widths.includes(metadata.width)
    ) {
      this.widths.push(metadata.width);
    }
    if (
      this.options.formats.includes(null) &&
      !this.formats.includes(metadata.format)
    ) {
      this.formats.push(metadata.format);
    }
  }

  async start(cache = true) {
    if (this.started) return;
    if (cache && caches.includes(this.getCacheKey())) return;

    this.started = true;

    if (!this.metadata) {
      this.parseMetadata(await this.sharp.metadata());
    }

    caches.push(this.getCacheKey());

    fs.mkdirSync(this.options.outputDir, { recursive: true });

    this.formats.forEach((f) => {
      this.widths.forEach((w) => {
        queue.add(async () => {
          const outputPath = path.join(
            this.options.outputDir,
            this.getFilename(w, f)
          );
          await this.sharp.resize(w).toFile(outputPath);
          if (++count % 10 === 0) console.log(`image ${count}/${total}`);
        });
        total++;
      });
    });
  }

  getImgTag(attributes = this.imageAttributes) {
    const format = this.formats[this.formats.length - 1];
    const imgSrc = this.getFileSrc(this.widths[this.widths.length - 1], format);

    const srcset = this.getSrcset(format);

    const attributesString = this.objectToAttributes(attributes, ["srcset"]);

    return `<img src="${imgSrc}" srcset="${srcset}" ${attributesString} width="${this.metadata.width}" height="${this.metadata.height}">`;
  }

  getSourcesTag(attributes = this.imageAttributes) {
    const out = [];

    const attributesString = this.objectToAttributes(attributes, [
      "alt",
      "decoding",
      "loading",
      "srcset",
    ]);

    for (const format of this.options.formats) {
      const srcset = this.getSrcset(format);
      out.push(
        `<source type="${MIME_TYPES[format]}" srcset="${srcset}" ${attributesString}>`
      );
    }
    return out.join("\n");
  }

  async generateHTML() {
    if (!this.metadata) {
      this.parseMetadata(await this.sharp.metadata());
    }

    const img = this.getImgTag();
    const sources = this.getSourcesTag();

    const htmlString = `<picture>
    ${sources}
    ${img}
    </picture>`;
    return htmlString;
  }

  async getHTML() {
    if (!this.htmlString) {
      this.htmlString = this.generateHTML(...arguments);
    }
    return this.htmlString;
  }

  /**
   * Must already have metadata.
   *
   * @returns string
   */
  getHTMLSync() {
    if (this.htmlString) {
      return this.htmlString;
    }
    if (!this.metadata) {
      throw new Error("Metadata is required!");
    }

    const img = this.getImgTag();
    const sources = this.getSourcesTag();

    const htmlString = `<picture>
    ${sources}
    ${img}
    </picture>`;
    return htmlString;
  }
}

async function transform(content) {
  for (const placeholder of placeholders) {
    const html = await placeholder.image.getHTML();
    content = content.replace(placeholder.regex, html);
  }
  return content;
}

module.exports = Image;
module.exports.transform = transform;
