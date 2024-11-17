import commonjs from "@rollup/plugin-commonjs";
import noderesolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import consts from "rollup-plugin-consts";
import replace from "rollup-plugin-replace";
import resolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/index.mjs",
    output: {
      format: "umd",
      dir: "dist",
      name: "foo",
      sourcemap: true,
    },
    // external: ["os"],
    plugins: [
      resolve({
        browser: true,
      }),
      replace({
        "process.env": "{}",
      }),
      commonjs(),
      json(),
    ],
  },
];
