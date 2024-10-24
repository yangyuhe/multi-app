import * as esbuild from "esbuild";
// import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import * as path from "path";
import GlobalsPlugin from "esbuild-plugin-globals";

let result = await esbuild.build({
  entryPoints: ["src/app.ts"],
  bundle: true,
  outdir: "dist",
  mainFields: [""],
  // inject: ["src/process-cwd-shim.ts"],
  platform: "browser",
  define: {
    "import.meta.url": "importMetaUrl",
    global: "globalThis",
  },
  format: "iife",
  external: ["vscode", "esbuild", "./xhr-sync-worker.js", "worker_threads"],
  plugins: [
    polyfillNode({
      // Options (optional)
      polyfills: {
        worker_threads: false,
        fs: true,
      },
    }),
    GlobalsPlugin({
      "node-fetch": "window.fetch",
    }),
  ],
});
console.log(result);
