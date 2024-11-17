import * as esbuild from "esbuild";
import { definePlugin } from "esbuild-plugin-define";

let result = await esbuild.build({
  entryPoints: ["src/main.mjs"],
  bundle: true,
  outdir: "dist",
  platform: "browser",
  sourcemap: true,
  plugins: [
    // definePlugin({
    //   process: {
    //     env: "{}",
    //   },
    // }),
  ],
});
console.log(result);
