---
title: Usage in React
description: Guide on how to use it in React
---

Follow the [Installation](/getting-started#installation) guide and install the package.

You can register the component in `App.tsx` if you want to define it globally or just import the package in your sepecific pages where you are using it.

```tsx
// src/routes/index.tsx

import "bsky-profile";

const Page = () => {
  return (
    <div>
      <bsky-profile data-handle="danabra.mov" />
    </div>
  );
};

export default Page;
```
