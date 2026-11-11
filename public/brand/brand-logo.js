const { tagline } = await (await fetch(new URL('./identity.json', import.meta.url))).json();
// Native HTML adapter. Canonical assets are maintained by Experiencias Mendoza.
class BrandLogo extends HTMLElement {
  static observedAttributes = ['variant', 'tone', 'size'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    const compact = this.getAttribute('variant') === 'compact';
    root.innerHTML = `<style>
      :host{display:inline-flex;flex-direction:column;gap:12px;align-items:center;max-width:100%;vertical-align:middle;width:var(--brand-width-md,224px);color:var(--brand-forest,#173d34)}
      :host([size="sm"]){width:var(--brand-width-sm,180px)}
      :host([size="lg"]){width:var(--brand-width-lg,258px)}
      :host([variant="compact"]){width:44px}
      :host([variant="compact"][size="sm"]){width:32px}
      :host([variant="compact"][size="lg"]){width:64px}
      :host([tone="light"]){color:var(--brand-cream,#f6f3eb)}
      :host([tone="mono"]){color:inherit}
      .symbol{display:block;width:100%;aspect-ratio:${compact ? '80/52' : '266/52'};background:currentColor;mask:url('/brand/${compact ? 'mark' : 'horizontal'}-mono.svg') center/contain no-repeat}
      @media(max-width:480px){:host(:not([variant="compact"])){width:var(--brand-width-sm,180px)}}
      .tagline{color:var(--brand-wine,#661a30);display:block;width:100%;font:400 11px/1.5 var(--brand-font,system-ui,sans-serif);letter-spacing:0;text-transform:none;text-align:center;text-wrap:balance}
      :host([tone="light"]) .tagline,:host([tone="mono"]) .tagline{color:inherit}
      .colored{display:block;width:100%;height:auto}
      :host(:not([tone="mono"])) .symbol{background:none;mask:none}
      :host([tone="mono"]) .colored{display:none}
    </style><span class="symbol" role="img" aria-label="Experiencias Mendoza"><img class="colored" src="/brand/${compact ? 'mark' : 'horizontal'}-${this.getAttribute('tone') === 'light' ? 'light' : 'dark'}.svg" alt=""></span>`;
    if (!compact) {
      const caption = document.createElement('span');
      caption.className = 'tagline';
      caption.textContent = tagline;
      root.append(caption);
    }
  }
}
if (!customElements.get('brand-logo')) customElements.define('brand-logo', BrandLogo);
