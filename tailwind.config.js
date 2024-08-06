const fs = require("fs");
const path = require("path");
const apps = fs
  .readFileSync(path.resolve(__dirname, "include.app"), { encoding: "utf-8" })
  .trim()
  .split("\n");
const includes = apps.map((app) => `./src/${app}/**/*.{jsx,tsx}`);

console.log("tailwindcss includes:", includes);
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: includes,
  theme: {
    extend: {},
  },
  plugins: [],
  // plugins: [require("daisyui")],
};
