import * as esbuild from "esbuild";
import { polyfillNode } from "esbuild-plugin-polyfill-node";

let result = await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outdir: "dist",
  // inject: ["src/process-cwd-shim.ts"],
  platform: "browser",
  define: {},
  format: "iife",
  plugins: [
    polyfillNode({
      // Options (optional)
      polyfills: {
        worker_threads: true,
        fs: true,
      },
    }),
  ],
});
console.log(result);
