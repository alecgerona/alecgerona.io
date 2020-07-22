const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: { dark: `#141936`, light: `#20bfde` },
        offwhite: `#fcfcfc`,
        green: `#56d187`,
        orange: `#ff9938`,
        "pale-blue": `#3546a8`,
      },
      fontFamily: {
        sans: `DM Sans`,
        serif: `Lora`,
      },
      height: {
        intro: `calc(100vh - 75px)`,
        "project-card": `500px`,
      },
      width: {
        "project-card": `310px`,
      },
      margin: {
        7: "1.75rem",
      },
    },
  },
  variants: {
    backgroundColor: [`light`],
    textColor: [`light`],
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      const lightSelector = `.light`;
      addVariant("light", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${lightSelector} .${e(`light${separator}${className}`)}`;
        });
      });
    }),
    require("@tailwindcss/typography"),
  ],
};
