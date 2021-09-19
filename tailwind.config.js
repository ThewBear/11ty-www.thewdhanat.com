module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.njk", "./src/**/*.md"],
  darkMode: "media",
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
  variants: {
    typography: ["dark"],
  },
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: [],
    }),
  ],
};
