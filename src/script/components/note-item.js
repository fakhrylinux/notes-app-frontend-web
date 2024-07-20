class NoteItem extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _note = {
        id: null,
        createdAt: null,
        title: null,
        body: null,
    };

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    set note(value) {
        this._note = value;

        this.render();
    }

    get note() {
        return this._note;
    }

    _updateStyle() {
        this._style.textContent = `
        :host {
            padding: .5rem;
            border: 1px solid black;
            border-radius: 4px;
            margin: 10px 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .note-item__content {
            padding: 12px;
            flex: 1;
        }

        .note-item__content a {
            text-decoration: none;
        }

        .note-item__title {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 4px;
            color: black;
        }

        .note-item__date {
            font-size: 12px;
            margin-bottom: 8px;
            color: #11335a;
        }

        .note-item__body {
            font-size: 14px;
        }
      `;
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `

        <div class="note-item">
            <div class="note-item__content">
                <a href="#">
                    <h3 class="note-item__title">${this._note.title}</h3>
                </a>
                <p class="note-item__date">${this._note.createdAt}</p>
                <p class="note-item__body">${this._note.body}</p>
            </div>
        </div>
      `;
    }
}

customElements.define('note-item', NoteItem);