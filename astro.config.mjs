// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import umami from "@yeskunall/astro-umami";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import { SITE } from "./site.config.mjs";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,

  adapter: cloudflare({ imageService: "compile" }),

  integrations: [
    SITE.indexable && sitemap(),
    umami({
      id: "011ffcdf-f9e9-49ad-8bf0-587e41429ccb",
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
