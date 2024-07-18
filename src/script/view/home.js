import Utils from '../utils.js';
import Notes from '../data/local/notes.js';

const home = () => {
    const searchFormElement = document.querySelector('#searchForm');
    const noteListContainerElement = document.querySelector('#noteListContainer');
    const noteQueryWaitingElement = noteListContainerElement.querySelector('.query-waiting');
    const noteLoadingElement = noteListContainerElement.querySelector('.search-loading');
    const noteListElement = noteListContainerElement.querySelector('.note-list');
    const listElement = noteListElement.querySelector('.list');

    const showNote = (query) => {
        showLoading();
        const result = Notes.searchNote(query);
        displayResult(result);
        showNoteList();
    };

    const onSearchHandler = (event) => {
        event.preventDefault();

        const query = event.target.elements.name.value;
        showNote(query);
    };

    const displayResult = (notes) => {
        const noteItem = notes.map((note) => {
            return `
            <div class="note-item">
                    <div class="note-item__content">
                        <a href="#">
                            <h3 class="note-item__title">${note.title}</h3>
                        </a>
                        <p class="note-item__date">${note.createdAt}</p>
                        <p class="note-item__body">${note.body}</p>
                    </div>
                </div>
            `;
        });

        listElement.innerHTML = noteItem.join('');
    };

    const showNoteList = () => {
        Array.from(noteListContainerElement.children).forEach((element) => {
            Utils.hideElement(element);
        });
        Utils.showElement(noteListElement);
    };

    const showLoading = () => {
        Array.from(noteListContainerElement.children).forEach((element) => {
            Utils.hideElement(element);
        });
        Utils.showElement(noteLoadingElement);
    };

    const showQueryWaiting = () => {
        Array.from(noteListContainerElement.children).forEach((element) => {
            Utils.hideElement(element);
        });
        Utils.showElement(noteQueryWaitingElement);
    };

    searchFormElement.addEventListener('submit', onSearchHandler);
    showQueryWaiting();
};

export default home;
