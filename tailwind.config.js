module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.njk", "./_site/**/*.html"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.black"),
            maxWidth: "80ch",
            img: {
              marginLeft: "auto",
              marginRight: "auto",
            },
            a: {
              textDecoration: "none",
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: [],
  },
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: [],
    }),
  ],
};
