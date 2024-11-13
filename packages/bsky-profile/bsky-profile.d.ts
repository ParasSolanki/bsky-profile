export {};

type BskyProfileDataAttributes = {
  "data-handle"?: string;
  "data-show-description"?: "true" | "false";
  "data-show-banner"?: "true" | "false";
  "data-theme"?: "auto" | "light" | "dark";
};

declare global {
  interface HTMLElementTagNameMap {
    "bsky-profile": HTMLElement;
  }

  namespace astroHTML.JSX {
    type BskyProfileAttributes = HTMLAttributes & BskyProfileDataAttributes;

    interface DefinedIntrinsicElements {
      "bsky-profile": BskyProfileAttributes;
    }
  }

  namespace JSX {
    type BskyProfileAttributes = HTMLElement & BskyProfileDataAttributes;

    interface IntrinsicElements {
      ["bsky-profile"]: import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<BskyProfileAttributes>,
        HTMLElement
      >;
    }
  }
}
