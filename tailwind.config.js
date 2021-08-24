const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{html,scss,ts}"],
  darkMode: "class", // or 'media' or 'class'
  mode: "jit",
  theme: {
    colors: {
      ...colors,
      transparent: "transparent",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
