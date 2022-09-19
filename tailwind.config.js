/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss");
module.exports = {
  content: [
    "./node_modules/xtendui/src/*.mjs",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mini: { min: "1px", max: "374px" },

      sm: { min: "375px", max: "767px" },

      "min-sm": { min: "379px" },

      "min-md": { min: "768px" },

      md: { min: "768px", max: "1023px" },

      lg: { min: "1024px", max: "1279px" },

      "min-lg": { min: "1024px" },

      xl: { min: "1280px", max: "1535px" },

      "2xl": { min: "1536px" },
    },
    extend: {},
  },
  plugins: [],
  presets: [
    require("xtendui/tailwind.preset"),
    require("tailwindcss/defaultConfig"),
  ],
};
