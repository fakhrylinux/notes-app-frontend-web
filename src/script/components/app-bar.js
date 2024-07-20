class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
        :host {
            .topnav {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #596FB7;
                    padding: 0 .5rem;
                    position: sticky;
                    top: 0;
                    z-index: 1;
                }

                .topnav li {
                    color: white;
                    padding: .5rem 0;
                    text-decoration: none;
                    font-size: 17px;
                    display: block;
                }

                .topnav a {
                    padding: 14px 8px;
                }

                .topnav a.icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    right: 0;
                    top: 0;
                }

                .topnav li:hover {
                    background-color: #595eb7;
                    color: black;
                }
                        }
                .head_bar__title {
                    color: aqua;
                }

                nav {
                    max-width: 81.25rem;
                    margin-inline: auto;
                }

                nav a {
                    font-size: 18px;
                    font-weight: 400;
                    text-decoration: none;
                    color: #F6ECA9;
                }        
                    `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `      
          <nav class="topnav">
                <a href="#">
                    <h1 class="head_bar__title">Notes App</h1>
                </a>
            </nav>
        `;
    }
}

customElements.define('app-bar', AppBar);