import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [typescript()],
} as RollupOptions;
