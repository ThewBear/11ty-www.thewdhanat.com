module.exports = {
  content: ["./src/**/*.html", "./src/**/*.njk", "./src/**/*.md"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
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
  plugins: [require("@tailwindcss/typography")],
};
