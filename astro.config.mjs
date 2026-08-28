// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import umami from "@yeskunall/astro-umami";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),

  integrations: [
    umami({
      id: "011ffcdf-f9e9-49ad-8bf0-587e41429ccb",
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
