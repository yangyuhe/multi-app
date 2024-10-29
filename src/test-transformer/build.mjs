import * as esbuild from "esbuild";

let result = await esbuild.build({
  entryPoints: ["src/index.mjs"],
  bundle: true,
  outdir: "dist",
  // inject: ["src/process-cwd-shim.ts"],
  platform: "browser",
  define: {},
  format: "esm",
  plugins: [],
});
console.log(result);
