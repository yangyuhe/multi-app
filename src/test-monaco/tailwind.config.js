const path = require("path");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
