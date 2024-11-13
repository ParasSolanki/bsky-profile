# Bsky Profile

Unofficial BSKY ([Bluesky](https://bsky.app)) Profile Webcomponent

Bsky Profile Webcomponent. `<bsky-profile>` is a custom web component that displays a user's Bluesky profile. It fetches the profile data from the Bluesky API and renders it in a clean, responsive layout and with dark, light and auto theme support.

Additionally, the component respects the user's device settings and avoids animations if the user has enabled "Reduce Motion" in their browser preferences.

### Installation

```bash
npm i bsky-profile
```

### Usage

```html
<!-- Default with description and banner -->
<bsky-profile data-handle="danabra.mov"></bsky-profile>

<!-- Default with no description -->
<bsky-profile
  data-handle="danabra.mov"
  data-show-description="false"
></bsky-profile>

<!-- Default with no banner -->
<bsky-profile data-handle="danabra.mov" data-show-banner="false"></bsky-profile>

<!-- Default with no banner and description -->
<bsky-profile
  data-handle="danabra.mov"
  data-show-description="false"
  data-show-banner="false"
></bsky-profile>

<!-- Default with description, banner and theme dark -->
<bsky-profile data-handle="danabra.mov" data-theme="dark"></bsky-profile>

<!-- Default with description, banner and theme auto -->
<bsky-profile data-handle="danabra.mov" data-theme="auto"></bsky-profile>
```

Checkout the full [docs](https://github.com/ParasSolanki/bsky-profile/blob/main/packages/bsky-profile/README.md).

> Note: Working on the docs with interactive ui and more examples.
