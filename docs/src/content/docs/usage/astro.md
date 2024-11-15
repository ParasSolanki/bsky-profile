---
title: Usage in Astro
description: Guide on how to use it in Astro
---

To use the component in Astro, you can use the CDN or install it as a dependency.

## Using with CDN

Place the following script in the head of your Astro page.

```astro
// src/pages/index.astro

<script
  is:inline
  src="https://cdn.jsdelivr.net/npm/bsky-profile@0.0.1/dist/bsky-profile.js"
></script>
```

Now, you can use the component in your Astro page.

```astro
// src/pages/index.astro

<bsky-profile data-handle="danabra.mov"></bsky-profile>
```

## Usage as Package

Install `bsky-profile` module and inside your page file add below `<script>` tag

```astro
// src/pages/index.astro

<html>
  <body>
    <bsky-profile data-handle="danabra.mov"></bsky-profile>

    <script>
      import "bsky-profile";
    </script>
  </body>
</html>
```

You can add a `<script>` tag in your layouts file as well so you don't have to manually add `<script>` tag to every page.

## Usage in MDX files

To use it inside a MDX file you have to create a separate Astro component and add a `<script>` tag there to load package.

```astro
// src/components/bsky-profile.astro

<script>
  import "bsky-profile";
</script>
```

And import component where you are using it.

```mdx
// src/content/docs/astro.mdx

import "src/components/bsky-profile.astro";

<bsky-profile data-handle="danabra.mov"></bsky-profile>
```
