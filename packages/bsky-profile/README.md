# Bsky Profile

Unofficial BSKY ([Bluesky](https://bsky.app)) Profile Webcomponent

Bsky Profile Webcomponent. `<bsky-profile>` is a custom web component that displays a user's Bluesky profile. It fetches the profile data from the Bluesky API and renders it in a clean, responsive layout and with dark, light and auto theme support.

Additionally, the component respects the user's device settings and avoids animations if the user has enabled "Reduce Motion" in their browser preferences.

## 📚 Documentation

Want to get started using some embed components?

Check out the [`bsky-profile` documentation](https://parassolanki.github.io/bsky-profile/)

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

### Preview

[Preview](https://github.com/ParasSolanki/bsky-profile/blob/main/packages/bsky-profile/preview.png)

### Attributes

The component supports the following attributes:

| Attribute               | Description                                                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-handle`           | The Bluesky handle of the user whose profile you want to display.                                                                                                                 |
| `data-show-description` | (Optional) Set to "false" to hide the user's profile description.                                                                                                                 |
| `data-show-banner`      | (Optional) Set to "false" to hide the user's profile banner.                                                                                                                      |
| `data-theme`            | (Optional) Set to "light", "dark", or "auto" to control the theme of the component. The "auto" setting will automatically adjust the theme based on the user's system preference. |

### Customization with CSS variables

The component uses the following CSS variables to allow for easy customization:

```css
:host {
  --bsky-color: #0072fe;
  --bsky-text-color: #000000;
  --bsky-muted-text-color: #42576c;
  --bsky-loading-color: #f0f3f5;
  --bsky-font-size: 1rem;
  --bsky-line-height: 1.5rem;
  --bsky-font-family: Arial, Helvetica, -apple-system, sans-serif;
  --bsky-profile-width: 20rem;
  --bsky-profile-background-color: #ffffff;
  --bsky-profile-border-radius: 0.75rem;
  --bsky-profile-box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  --bsky-banner-width: 20rem;
  --bsky-banner-height: 6.5rem;
  --bsky-banner-background-color: #f0f3f5;
  --bsky-left-padding: 0.75rem;
  --bsky-right-padding: 0.75rem;
  --bsky-top-padding: 0.5rem;
  --bsky-bottom-padding: 0.5rem;
  --bsky-avatar-width: 4.5rem;
  --bsky-avatar-height: 4.5rem;
  --bsky-follow-color: #ffffff;
  --bsky-follow-padding: 0.5rem 0.75rem;
  --bsky-follow-border-radius: 10rem;
  --bsky-follow-font-size: 1rem;
  --bsky-follow-line-height: 1.5rem;
  --bsky-display-name-font-size: 1.5rem;
  --bsky-handle-font-size: 1rem;
  --bsky-stats-font-size: 1rem;
  --bsky-logo-width: 1.5rem;
  --bsky-logo-height: 1.5rem;
}

:host([data-theme="dark"]) {
  --bsky-text-color: #f1f3f5;
  --bsky-muted-text-color: #8c9eb2;
  --bsky-loading-color: #111b23;
  --bsky-profile-background-color: #000000;
  --bsky-banner-background-color: #111b23;
}

@media (prefers-color-scheme: dark) {
  :host([data-theme="auto"]) {
    --bsky-text-color: #f1f3f5;
    --bsky-muted-text-color: #8c9eb2;
    --bsky-loading-color: #111b23;
    --bsky-profile-background-color: #000000;
    --bsky-banner-background-color: #111b23;
  }
}
```

You can override these variables in your own CSS to customize the appearance of the component.
