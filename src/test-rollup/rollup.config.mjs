import commonjs from "@rollup/plugin-commonjs";
import noderesolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/index.js",
    output: {
      format: "es",
      dir: "dist",
    },
    external: ["os"],
    plugins: [noderesolve()],
  },
];
