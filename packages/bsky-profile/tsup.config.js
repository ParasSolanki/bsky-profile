import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["./bsky-profile.js"],
  outDir: "dist",
  clean: true,
  sourcemap: true,
  splitting: true,
  target: "es2020",
  dts: true,
  format: ["esm", "cjs"],
});
