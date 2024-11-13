const BSKY_BASE_URL = "https://bsky.app";
const BSKY_PROFILE_BASE_URL = `${BSKY_BASE_URL}/profile`;
const BSKY_PROFILE_API_URL =
  "https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile";

/**
 * Bluesky profile response associated data
 *
 * @typedef BskyProfileResponseAssociated
 * @property {number} lists
 * @property {number} feedgens
 * @property {number} starterPacks
 * @property {boolean} labeler
 */

/**
 * Bluesky profile response pinned post
 *
 * @typedef BskyProfileResponsePinnedPost
 * @property {string} cid
 * @property {string} uri
 */

/**
 * Bluesky profile response
 *
 * @typedef BskyProfileResponse
 *
 * @property {string} did
 * @property {string} handle
 * @property {string} displayName
 * @property {number} followersCount
 * @property {number} postsCount
 * @property {number} followsCount
 * @property {string} indexedAt
 * @property {string} createdAt
 * @property {Array<any>} labels
 * @property {string | undefined} banner
 * @property {string | undefined} avatar
 * @property {string | undefined} description
 * @property {BskyProfileResponseAssociated} associated
 * @property {BskyProfileResponsePinnedPost} pinnedPost
 */

/**
 * Format the description text to include anchor tags for URLs and line breaks
 *
 * @param {string} text
 * @returns {string}
 */
function formattedDescription(text) {
  // Regular expression to match URLs (http, https, www, or just a domain)
  const urlPattern =
    /\b((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._~:/?#\[\]@!$&'()*+,;=%-]*)?)|@[a-zA-Z0-9._]+/gi;

  // Replace URLs with anchor tags
  let formattedText = text.replace(urlPattern, (url) => {
    if (url.startsWith("@")) {
      const href = `${BSKY_PROFILE_BASE_URL}/${url.slice(1)}`;
      // its a bluesky handle!!
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    } else {
      let href = url.startsWith("http") ? url : `https://${url}`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${
        url.length > 24 ? `${url.slice(0, 24)}...` : url
      }</a>`;
    }
  });

  // Replace line breaks with <br /> tags
  formattedText = formattedText.replace(/\n/g, "<br />");

  return formattedText;
}

/**
 * Compact number formatter
 *
 * @type {Intl.NumberFormat}
 */
const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
});

/**
 * Styles for the bsky-profile component
 *
 * @type {string}
 */
const styles =
  ":host{--bsky-color:#0072fe;--bsky-text-color:#000000;--bsky-muted-text-color:#42576c;--bsky-loading-color:#f0f3f5;--bsky-font-size:1rem;--bsky-line-height:1.5rem;--bsky-font-family:Arial, Helvetica, -apple-system, sans-serif;--bsky-profile-width:20rem;--bsky-profile-background-color:#ffffff;--bsky-profile-border-radius:0.75rem;--bsky-profile-box-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1),0 1px 2px -1px rgb(0 0 0 / 0.1);--bsky-banner-width:20rem;--bsky-banner-height:6.5rem;--bsky-banner-background-color:#f0f3f5;--bsky-left-padding:0.75rem;--bsky-right-padding:0.75rem;--bsky-top-padding:0.5rem;--bsky-bottom-padding:0.5rem;--bsky-avatar-width:4.5rem;--bsky-avatar-height:4.5rem;--bsky-follow-color:#ffffff;--bsky-follow-padding:0.5rem 0.75rem;--bsky-follow-border-radius:10rem;--bsky-follow-font-size:1rem;--bsky-follow-line-height:1.5rem;--bsky-display-name-font-size:1.5rem;--bsky-handle-font-size:1rem;--bsky-stats-font-size:1rem;--bsky-logo-width:1.5rem;--bsky-logo-height:1.5rem}:host([data-theme='dark']){--bsky-text-color:#f1f3f5;--bsky-muted-text-color:#8c9eb2;--bsky-loading-color:#111b23;--bsky-profile-background-color:#000000;--bsky-banner-background-color:#111b23}@media (prefers-color-scheme:dark){:host([data-theme='auto']){--bsky-text-color:#f1f3f5;--bsky-muted-text-color:#8c9eb2;--bsky-loading-color:#111b23;--bsky-profile-background-color:#000000;--bsky-banner-background-color:#111b23}}p,h2,strong,div{margin:0}img{display:block;max-width:100%}.bsky__profile{position:relative;color:var(--bsky-text-color);background-color:var(--bsky-profile-background-color);width:var(--bsky-profile-width);border-radius:var(--bsky-profile-border-radius);box-shadow:var(--bsky-profile-box-shadow);font-family:var(--bsky-font-family);font-size:var(--bsky-font-size);line-height:var(--bsky-line-height);overflow:hidden}.bsky__profile-loading{background-color:var(--bsky-loading-color);color:var(--bsky-loading-color)}.bsky__profile-banner{width:var(--bsky-banner-width);height:var(--bsky-banner-height)}.bsky__profile-banner img{width:var(--bsky-banner-width);height:var(--bsky-banner-height)}.bsky__profile-inner{position:relative;padding-top:var(--bsky-top-padding);padding-bottom:var(--bsky-bottom-padding)}.bsky__profile-header,.bsky__profile-details,.bsky__profile-stats,.bsky__profile-description{padding-left:var(--bsky-left-padding);padding-right:var(--bsky-right-padding)}.bsky__profile-header{display:flex;align-items:center;justify-content:space-between}.bsky__profile-follow{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;padding-left:var(--bsky-left-padding);padding-right:var(--bsky-right-padding)}.bsky__profile-avatar{display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:100%;width:var(--bsky-avatar-width);height:var(--bsky-avatar-height);margin-left:var(--bsky-left-padding);margin-right:var(--bsky-right-padding)}.bsky__profile-avatar img{width:var(--bsky-avatar-width);height:var(--bsky-avatar-height)}.bsky__profile-follow-link{display:inline-flex;align-items:center;background-color:var(--bsky-color);color:var(--bsky-follow-color);padding:var(--bsky-follow-padding);font-size:var(--bsky-follow-font-size);line-height:var(--bsky-follow-line-height);border-radius:var(--bsky-follow-border-radius);text-decoration:none;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms}.bsky__profile-follow-link:hover,.bsky__profile-follow-link:focus{opacity:.86}.bsky__profile-follow-link svg{width:1rem;height:1rem;margin-right:.25rem}.bsky__profile-display-name{margin:0;font-size:var(--bsky-display-name-font-size);color:var(--bsky-text-color)}.bsky__profile-handle{margin:0;font-size:var(--bsky-handle-font-size);color:var(--bsky-muted-text-color)}.bsky__profile-details{padding-bottom:var(--bsky-bottom-padding)}.bsky__profile-stats{display:flex;align-items:center;flex-wrap:wrap;gap:.5rem;padding-bottom:var(--bsky-bottom-padding)}.bsky__profile-stats p{color:var(--bsky-muted-text-color)}.bsky__profile-stats p strong{color:var(--bsky-text-color);margin-right:.25rem}.bsky__profile-description{padding-bottom:var(--bsky-bottom-padding);color:var(--bsky-text-color)}.bsky__profile-link{position:absolute;right:0;bottom:0;text-decoration:none;color:var(--bsky-color);padding-left:var(--bsky-left-padding);padding-right:var(--bsky-right-padding);transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms}.bsky__profile-link:hover,.bsky__profile-link:focus{opacity:.86}.bsky__profile-link svg{width:var(--bsky-logo-width);height:var(--bsky-logo-height)}.bsky__profile-link svg .left{transform-origin:center}.bsky__profile-link svg .right{transform-origin:center;transform:scaleX(-1)}.bsky__profile-animate-pulse{animation:bsky-profile-pulse 2s cubic-bezier(.4,0,.6,1) infinite}@media (prefers-reduced-motion:reduce){.bsky__profile-animate-pulse{animation:none}}@keyframes bsky-profile-pulse{0%,100%{opacity:1}50%{opacity:.5}}";

/**
 * Bsky Profile Component - A web component to display a bluesky profile
 *
 * @class BskyProfile
 * @extends {HTMLElement}
 * @example
 *
 * ```html
 * // Default with description and banner
 * <bsky-profile data-handle="danabra.mov"></bsky-profile>
 *
 * // Default with no description
 * <bsky-profile data-handle="danabra.mov" data-show-description="false"></bsky-profile>
 *
 * // Default with no banner
 * <bsky-profile data-handle="danabra.mov" data-show-banner="false"></bsky-profile>
 *
 * // Default with no banner and description
 * <bsky-profile data-handle="danabra.mov" data-show-description="false" data-show-banner="false"></bsky-profile>
 *
 * // Default with description, banner and theme dark
 * <bsky-profile data-handle="danabra.mov" data-theme="dark"></bsky-profile>
 *
 * // Default with description, banner and theme auto
 * // Will change based on the user's system preference
 * <bsky-profile data-handle="danabra.mov" data-theme="auto"></bsky-profile>
 * ```
 */
class BskyProfile extends HTMLElement {
  /**
   * Abort controller instance
   *
   * @type {AbortController}
   * @private
   * @readonly
   */
  #abortController = new AbortController();

  /**
   * Loading state
   *
   * @type {boolean}
   * @private
   * @readonly
   */
  #isLoading = false;

  /**
   * Error message
   *
   * @type {(string|undefined)}
   * @private
   * @readonly
   */
  #error = undefined;

  /**
   * Bluesky profile data
   *
   * @type {(BskyProfileResponse|undefined)}
   * @private
   * @readonly
   */
  #data = undefined;

  /**
   * Shadow root options
   *
   * @type {ShadowRootInit}
   * @static
   * @readonly
   */
  static shadowRootOptions = { mode: "open" };

  /**
   * Observed attributes
   *
   * @static
   * @type {string[]} - The observed attributes
   */
  static get observedAttributes() {
    return [
      "data-handle",
      "data-theme",
      "data-show-banner",
      "data-show-description",
    ];
  }

  /**
   * Creates an instance of BskyProfile
   *
   * @constructor
   * @returns {void}
   */
  constructor() {
    super();
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);

    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.adoptedStyleSheets = [sheet];
    const bskyProfileEl = document.createElement("div");
    bskyProfileEl.className = "bsky__profile";

    shadowRoot.appendChild(bskyProfileEl);
  }

  /**
   * Lifecycle method called when the component is connected to the DOM
   *
   * @returns {void}
   */
  connectedCallback() {
    if (!this.dataset.handle) return;

    this.fetchHandleDetails(this.dataset.handle).finally(() => this.render());

    this.render();
  }

  /**
   * Lifecycle method called when the component is disconnected from the DOM
   *
   * @returns {void}
   */
  disconnectedCallback() {
    this.#abortController.abort();
  }

  /**
   * Lifecycle method called when an observed attribute changes
   *
   * @param {string} attr - The attribute that changed
   * @param {string} oldValue - The old value of the attribute
   * @param {string} newValue - The new value of the attribute
   * @returns {void}
   */
  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (attr === "data-theme") return;

    if (attr === "data-handle") {
      this.fetchHandleDetails(newValue).finally(() => this.render());
    } else {
      this.render();
    }
  }

  /**
   * Fetch the bsky handle details
   *
   * @param {string} handle
   * @returns {Promise<void>}
   */
  async fetchHandleDetails(handle) {
    this.#error = undefined;
    this.#data = undefined;
    this.#isLoading = true;

    try {
      const response = await fetch(`${BSKY_PROFILE_API_URL}?actor=${handle}`, {
        signal: this.#abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Cant retrive ${handle} bluesky profile`);
      }

      this.#data = await response.json();
    } catch (error) {
      if (error instanceof Error) {
        this.#error = error.message;
      } else if (typeof error === "string") {
        this.#error = error;
      } else {
        this.#error = `Cant retrive ${handle} bluesky profile`;
      }
    } finally {
      this.#isLoading = false;
    }
  }

  /**
   * Get the plus svg icon template nodes
   *
   * @returns {Node[]}
   */
  getPlusIconTemplateNodes() {
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svgNS = svgEl.namespaceURI;

    svgEl.setAttribute("width", "24");
    svgEl.setAttribute("height", "24");
    svgEl.setAttribute("viewBox", "0 0 24 24");
    svgEl.setAttribute("fill", "none");
    svgEl.setAttribute("stroke", "currentColor");
    svgEl.setAttribute("aria-hidden", "true");
    svgEl.setAttribute("stroke-width", "2");
    svgEl.setAttribute("stroke-linecap", "round");
    svgEl.setAttribute("stroke-linejoin", "round");

    const pathEl = document.createElementNS(svgNS, "path");
    pathEl.setAttribute("d", "M5 12h14");

    const pathEl2 = document.createElementNS(svgNS, "path");
    pathEl2.setAttribute("d", "M12 5v14");

    svgEl.append(pathEl, pathEl2);
    return [svgEl];
  }

  /**
   * Get the profile svg icon template nodes
   *
   * @returns {Node[]}
   */
  getProfileIconTemplateNodes() {
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svgNS = svgEl.namespaceURI;

    svgEl.setAttribute("width", "90");
    svgEl.setAttribute("height", "90");
    svgEl.setAttribute("viewBox", "0 0 24 24");
    svgEl.setAttribute("fill", "none");
    svgEl.setAttribute("stroke", "none");
    svgEl.setAttribute("aria-hidden", "true");

    const circleEl = document.createElementNS(svgNS, "circle");
    circleEl.setAttribute("cx", "12");
    circleEl.setAttribute("cy", "12");
    circleEl.setAttribute("r", "12");
    circleEl.setAttribute("fill", "#0070ff");

    const circleEl2 = document.createElementNS(svgNS, "circle");
    circleEl2.setAttribute("cx", "12");
    circleEl2.setAttribute("cy", "9.5");
    circleEl2.setAttribute("r", "3.5");
    circleEl2.setAttribute("fill", "#fff");

    const pathEl = document.createElementNS(svgNS, "path");
    pathEl.setAttribute("stroke-linecap", "round");
    pathEl.setAttribute("stroke-linejoin", "round");
    pathEl.setAttribute("fill", "#fff");
    pathEl.setAttribute(
      "d",
      "M 12.058 22.784 C 9.422 22.784 7.007 21.836 5.137 20.262 C 5.667 17.988 8.534 16.25 11.99 16.25 C 15.494 16.25 18.391 18.036 18.864 20.357 C 17.01 21.874 14.64 22.784 12.058 22.784 Z"
    );

    svgEl.append(circleEl, circleEl2, pathEl);
    return [svgEl];
  }

  /**
   * Get the profile bsky link template nodes
   *
   * @param {string} handle
   * @returns {Node[]}
   */
  getProfileBskyLinkTemplateNodes(handle) {
    const aEl = document.createElement("a");
    aEl.classList.add("bsky__profile-link");
    aEl.target = "_blank";
    aEl.rel = "noopener noreferrer";
    aEl.href = `${BSKY_PROFILE_BASE_URL}/${handle}`;
    aEl.ariaLabel = `View ${handle}'s bluesky profile`;

    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svgNS = svgEl.namespaceURI;

    svgEl.setAttribute("viewBox", "0 0 566 500");
    svgEl.setAttribute("aria-hidden", "true");

    const defsEl = document.createElementNS(svgNS, "defs");

    const pathEl = document.createElementNS(svgNS, "path");
    pathEl.setAttribute("id", "wing");
    pathEl.setAttribute("fill", "currentColor");
    pathEl.setAttribute(
      "d",
      "M 123.244 35.008 C 188.248 83.809 283.836 176.879 283.836 235.857 C 283.836 316.899 283.879 235.845 283.836 376.038 C 283.889 375.995 282.67 376.544 280.212 383.758 C 266.806 423.111 214.487 576.685 94.841 453.913 C 31.843 389.269 61.013 324.625 175.682 305.108 C 110.08 316.274 36.332 297.827 16.093 225.504 C 10.271 204.699 0.343 76.56 0.343 59.246 C 0.343 -27.451 76.342 -0.206 123.244 35.008 Z"
    );

    const useLeftEl = document.createElementNS(svgNS, "use");
    useLeftEl.setAttribute("xlink:href", "#wing");
    useLeftEl.classList.add("left");

    const useRightEl = document.createElementNS(svgNS, "use");
    useRightEl.setAttribute("xlink:href", "#wing");
    useRightEl.classList.add("right");

    defsEl.appendChild(pathEl);
    svgEl.append(defsEl, useLeftEl, useRightEl);
    aEl.appendChild(svgEl);

    return [aEl];
  }

  /**
   * Get the error template nodes
   *
   * @param {string} error
   * @returns {Node[]}
   */
  getErrorTemplateNodes(error) {
    const bannerEl = document.createElement("div");
    bannerEl.classList.add("bsky__profile-banner");
    const profileInnerEl = document.createElement("div");
    profileInnerEl.classList.add("bsky__profile-inner");

    const errorEl = document.createElement("p");
    errorEl.textContent = error;

    profileInnerEl.appendChild(errorEl);

    return [bannerEl, profileInnerEl];
  }

  /**
   * Get the skeleton template nodes
   *
   * @param {Object} options
   * @param {boolean} options.showBanner
   * @param {boolean} options.showDescription
   * @returns {Node[]}
   */
  getSkeletonTemplateNodes({ showBanner, showDescription }) {
    var bannerEl, descriptionEl;
    if (showBanner) {
      bannerEl = document.createElement("div");
      bannerEl.classList.add(
        "bsky__profile-banner",
        "bsky__profile-animate-pulse"
      );
      bannerEl.style.width = "var(--bsky-banner-width)";
      bannerEl.style.height = "var(--bsky-banner-height)";
      bannerEl.style.backgroundColor = "var(--bsky-loading-color)";
    }

    const profileInnerEl = document.createElement("div");
    profileInnerEl.classList.add("bsky__profile-inner");

    const headerEl = document.createElement("div");
    headerEl.classList.add("bsky__profile-header");

    const avatarPlaceholderEl = document.createElement("div");
    avatarPlaceholderEl.classList.add("bsky__profile-avatar-placeholder");
    avatarPlaceholderEl.style.display = showBanner ? "block" : "none";

    const avatarEl = document.createElement("div");
    avatarEl.classList.add(
      "bsky__profile-avatar",
      "bsky__profile-loading",
      "bsky__profile-animate-pulse"
    );
    avatarEl.style.position = showBanner ? "absolute" : "static";
    avatarEl.style.top = showBanner ? "-2rem" : "0";
    avatarEl.style.width = "var(--bsky-avatar-width)";
    avatarEl.style.height = "var(--bsky-avatar-height)";
    avatarEl.style.borderRadius = "100%";

    const followEl = document.createElement("div");
    followEl.classList.add("bsky__profile-follow");

    const loadingEl = document.createElement("div");
    loadingEl.classList.add("bsky__profile-loading");
    loadingEl.style.width = "6rem";
    loadingEl.style.height = "2rem";
    loadingEl.style.borderRadius = "var(--bsky-follow-border-radius)";

    followEl.appendChild(loadingEl);

    const detailsEl = document.createElement("div");
    detailsEl.classList.add("bsky__profile-details");
    detailsEl.style.paddingTop = !showBanner ? "var(--bsky-top-padding)" : "0";

    const displayNameEl = document.createElement("h2");
    displayNameEl.classList.add(
      "bsky__profile-display-name",
      "bsky__profile-loading",
      "bsky__profile-animate-pulse"
    );
    displayNameEl.style.width = "10rem";
    displayNameEl.style.height = "1.5rem";

    const handleEl = document.createElement("p");
    handleEl.classList.add(
      "bsky__profile-handle",
      "bsky__profile-loading",
      "bsky__profile-animate-pulse"
    );
    handleEl.style.width = "8rem";
    handleEl.style.height = "1rem";
    handleEl.style.marginTop = "var(--bsky-top-padding)";

    detailsEl.append(displayNameEl, handleEl);

    const statsEl = document.createElement("div");
    statsEl.classList.add("bsky__profile-stats");

    const followersEl = document.createElement("p");
    followersEl.style.width = "5rem";
    followersEl.style.height = "1rem";
    followersEl.classList.add(
      "bsky__profile-followers",
      "bsky__profile-loading",
      "bsky__profile-animate-pulse"
    );
    const followersCountEl = document.createElement("strong");
    followersEl.prepend(followersCountEl);

    const followsEl = document.createElement("p");
    followsEl.classList.add(
      "bsky__profile-follows",
      "bsky__profile-loading",
      "bsky__profile-animate-pulse"
    );
    followsEl.style.width = "5rem";
    followsEl.style.height = "1rem";
    const followsCountEl = document.createElement("strong");
    followsEl.prepend(followsCountEl);

    statsEl.append(followersEl, followsEl);

    if (showDescription) {
      descriptionEl = document.createElement("div");
      descriptionEl.classList.add("bsky__profile-description");

      const dFragment = document.createDocumentFragment();
      const widths = ["100%", "100%", "80%", "60%"];

      for (let index = 0; index < widths.length; index++) {
        const el = document.createElement("p");
        el.classList.add(
          "bsky__profile-loading",
          "bsky__profile-animate-pulse"
        );
        el.style.width = widths[index];
        el.style.height = "0.5rem";

        if (index !== 0) el.style.marginTop = "0.5rem";

        dFragment.append(el);
      }

      descriptionEl.append(dFragment);
    }

    headerEl.append(avatarPlaceholderEl, avatarEl, followEl);
    profileInnerEl.append(headerEl, detailsEl, statsEl);

    if (descriptionEl) profileInnerEl.appendChild(descriptionEl);

    return bannerEl ? [bannerEl, profileInnerEl] : [profileInnerEl];
  }

  /**
   * Get the profile template nodes
   *
   * @param {BskyProfileResponse} data
   * @param {Object} options
   * @param {boolean} options.showBanner
   * @param {boolean} options.showDescription
   * @returns {Node[]}
   */
  getProfileTemplateNodes(data, { showBanner, showDescription }) {
    var bannerEl, descriptionEl;
    if (showBanner) {
      bannerEl = document.createElement("div");
      bannerEl.classList.add("bsky__profile-banner");

      if (data.banner) {
        const imageEl = document.createElement("img");
        imageEl.src = data.banner;
        imageEl.alt = `${data.handle} banner`;
        imageEl.style.width = "100%";
        imageEl.style.height = "auto";
        imageEl.loading = "lazy";
        imageEl.decoding = "async";
        bannerEl.appendChild(imageEl);
      } else {
        bannerEl.style.backgroundColor = "var(--bsky-banner-background-color)";
      }
    }

    const profileInnerEl = document.createElement("div");
    profileInnerEl.classList.add("bsky__profile-inner");

    const headerEl = document.createElement("div");
    headerEl.classList.add("bsky__profile-header");

    const avatarPlaceholderEl = document.createElement("div");
    avatarPlaceholderEl.classList.add("bsky__profile-avatar-placeholder");
    avatarPlaceholderEl.style.display = showBanner ? "block" : "none";

    const avatarEl = document.createElement("div");
    avatarEl.classList.add("bsky__profile-avatar");
    avatarEl.style.position = showBanner ? "absolute" : "static";
    avatarEl.style.top = showBanner ? "-2rem" : "0";

    if (data.avatar) {
      const avatarImageEl = document.createElement("img");
      avatarImageEl.src = data.avatar;
      avatarImageEl.alt = `${data.handle} avatar`;
      avatarImageEl.style.width = "100%";
      avatarImageEl.style.height = "auto";
      avatarImageEl.loading = "lazy";
      avatarImageEl.decoding = "async";
      avatarEl.appendChild(avatarImageEl);
    } else {
      avatarEl.append(...this.getProfileIconTemplateNodes());
    }

    const followEl = document.createElement("div");
    followEl.classList.add("bsky__profile-follow");

    const followLinkEl = document.createElement("a");
    followLinkEl.classList.add("bsky__profile-follow-link");
    followLinkEl.href = `${BSKY_PROFILE_BASE_URL}/${data.handle}`;
    followLinkEl.textContent = "Follow";
    followLinkEl.target = "_blank";
    followLinkEl.rel = "noopener noreferrer";
    followLinkEl.ariaLabel = `Follow ${data.handle} on bluesky`;
    followLinkEl.prepend(...this.getPlusIconTemplateNodes());
    followEl.appendChild(followLinkEl);

    const detailsEl = document.createElement("div");
    detailsEl.classList.add("bsky__profile-details");
    detailsEl.style.paddingTop = !showBanner ? "var(--bsky-top-padding)" : "0";

    const displayNameEl = document.createElement("h2");
    displayNameEl.classList.add("bsky__profile-display-name");
    displayNameEl.textContent = data.displayName;

    const handleEl = document.createElement("p");
    handleEl.classList.add("bsky__profile-handle");
    handleEl.textContent = `@${data.handle}`;

    detailsEl.append(displayNameEl, handleEl);

    const statsEl = document.createElement("div");
    statsEl.classList.add("bsky__profile-stats");

    const followersEl = document.createElement("p");
    followersEl.classList.add("bsky__profile-followers");
    const followersCountEl = document.createElement("strong");
    followersCountEl.textContent = compactNumberFormatter.format(
      data.followersCount
    );
    followersEl.textContent = "Followers";
    followersEl.prepend(followersCountEl);

    const followsEl = document.createElement("p");
    followsEl.classList.add("bsky__profile-follows");
    const followsCountEl = document.createElement("strong");
    followsCountEl.textContent = compactNumberFormatter.format(
      data.followsCount
    );
    followsEl.textContent = "Following";
    followsEl.prepend(followsCountEl);

    statsEl.append(followersEl, followsEl);

    if (showDescription && data.description) {
      descriptionEl = document.createElement("div");
      descriptionEl.classList.add("bsky__profile-description");

      const descriptionTextEl = document.createElement("p");
      descriptionTextEl.innerHTML = formattedDescription(data.description);
      descriptionEl.appendChild(descriptionTextEl);
    }

    headerEl.append(avatarPlaceholderEl, avatarEl, followEl);
    profileInnerEl.append(headerEl, detailsEl, statsEl);

    if (descriptionEl) profileInnerEl.appendChild(descriptionEl);

    profileInnerEl.append(...this.getProfileBskyLinkTemplateNodes(data.handle));

    return bannerEl ? [bannerEl, profileInnerEl] : [profileInnerEl];
  }

  /**
   * Render the component
   *
   * @returns {void}
   */
  render() {
    if (!this.shadowRoot) return;

    const bskyProfileEl = this.shadowRoot.querySelector(".bsky__profile");

    if (!bskyProfileEl) return;

    const showBanner = this.dataset.showBanner === "false" ? false : true;
    const showDescription =
      this.dataset.showDescription === "false" ? false : true;

    if (this.#isLoading) {
      bskyProfileEl.replaceChildren(
        ...this.getSkeletonTemplateNodes({ showBanner, showDescription })
      );
    } else if (this.#error) {
      bskyProfileEl.replaceChildren(...this.getErrorTemplateNodes(this.#error));
    } else {
      bskyProfileEl.replaceChildren(
        ...this.getProfileTemplateNodes(this.#data, {
          showBanner,
          showDescription,
        })
      );
    }
  }
}

if (
  globalThis.customElements &&
  !globalThis.customElements.get("bsky-profile")
) {
  globalThis.customElements.define("bsky-profile", BskyProfile);
}
