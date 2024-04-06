const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/test-tailwindcss/**/*", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), flowbite.plugin()],
}

