// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Bsky Profile",
      social: {
        github: "https://github.com/ParasSolanki/bsky-profile",
      },

      sidebar: [
        {
          label: "Getting Started",
          link: "getting-started",
        },
        {
          label: "Guides",
          items: [
            { label: "Attributes", slug: "guides/attributes" },
            { label: "Customization", slug: "guides/customization" },
            { label: "Extending types", slug: "guides/extending-types" },
          ],
        },
        {
          label: "Frameworks Usage",
          items: [
            { label: "Astro", slug: "usage/astro" },
            { label: "React", slug: "usage/react" },
          ],
        },
      ],
    }),
  ],
});
