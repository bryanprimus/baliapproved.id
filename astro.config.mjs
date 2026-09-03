// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import { SITE } from "./site.config.mjs";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  trailingSlash: "never",

  adapter: cloudflare({ imageService: "compile" }),

  integrations: [SITE.indexable && sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
