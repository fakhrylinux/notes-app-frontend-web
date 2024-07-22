class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    createdAt: null,
    title: null,
    body: null,
  };

  _deleteEvent = "delete";

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector("span.deleteBtn")
      .addEventListener("click", () => this._onClickHandler(this));
  }

  disconnectedCallback() {
    this._shadowRoot
      .querySelector("span.deleteBtn")
      .removeEventListener("click", () => this._onClickHandler(this));
  }

  _onClickHandler(noteItemInstance) {
    const id = this._note.id;
    noteItemInstance.dispatchEvent(
      new CustomEvent(this._deleteEvent, {
        detail: { id },
        bubbles: true,
      }),
    );
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
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");

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
            display: flex;
            flex-direction: column;
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

        .action {
            align-self: flex-end;
        }

        .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24;
            cursor: pointer;
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
                <div class="action">
                    <span id="${this._note.id}" class="material-symbols-outlined deleteBtn">delete</span>
                </div>
            </div>
        </div>
      `;
  }
}

customElements.define("note-item", NoteItem);
