class FooterBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `      
          <p>Copyright &#169; 2024, Fakhry</p>
        `;
    }
}

customElements.define('footer-bar', FooterBar);