import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([
    ".astro/**",
    ".wrangler/**",
    "dist/**",
    "worker-configuration.d.ts",
  ]),
  {
    name: "baliapproved/source",
    files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,astro}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
    },
  },
  astro.configs.recommended,
);
