import * as esbuild from "esbuild";

let result = await esbuild.build({
  entryPoints: ["src/index.mjs"],
  bundle: true,
  outdir: "dist",
  platform: "browser",
});
console.log(result);
