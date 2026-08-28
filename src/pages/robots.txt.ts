import type { APIRoute } from "astro";

import { SITE } from "../../site.config.mjs";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL(SITE.url);
  const lines = ["User-agent: *", "Allow: /"];

  if (SITE.indexable) {
    lines.push("", `Sitemap: ${new URL("sitemap-index.xml", siteUrl).href}`);
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
