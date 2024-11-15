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

Or
