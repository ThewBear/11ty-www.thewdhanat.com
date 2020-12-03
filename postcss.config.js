const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(IS_PRODUCTION ? [require("cssnano")] : []),
  ],
};
