import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.ts",
    output: {
      format: "es",
      dir: "dist",
    },
    external: ["os"],
    plugins: [typescript()],
  },
  {
    input: "src/web/index.ts",
    output: {
      format: "es",
      file: "dist/web_index.js",
    },
    external: ["os"],
    plugins: [typescript()],
  },
] as RollupOptions[];
