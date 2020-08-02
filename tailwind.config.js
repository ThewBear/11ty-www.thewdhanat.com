module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.njk", "./_site/**/*.html"],
  theme: {
    extend: {},
    typography: (theme) => ({
      default: {
        css: {
          color: theme("colors.black"),
          maxWidth: "80ch",
        },
      },
    }),
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
