module.exports = {
  content: ["./src/**/*.html", "./src/**/*.njk", "./src/**/*.md"],
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
        dark: {
          css: {
            color: theme("colors.gray.100"),
            a: {
              color: theme("colors.gray.200"),
              code: {
                color: theme("colors.gray.200"),
              },
            },
            code: {
              color: theme("colors.gray.200"),
            },
            strong: {
              color: theme("colors.gray.200"),
            },
            thead: {
              color: theme("colors.gray.200"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
