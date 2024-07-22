import Utils from '../utils.js';
import NotesApi from '../data/remote/notes-api.js';

const home = () => {
    const searchFormElement = document.querySelector('#searchForm');
    const noteListContainerElement = document.querySelector('#noteListContainer');
    const noteQueryWaitingElement = noteListContainerElement.querySelector('.query-waiting');
    const noteLoadingElement = noteListContainerElement.querySelector('.search-loading');
    const noteListElement = noteListContainerElement.querySelector('note-list');
    const noteInputFormElement = document.getElementById('input-note');
    const noteInput = noteInputFormElement.elements.title;

    const loadNotes = async () => {
        const notes = await NotesApi.getNotes();
        const noteItems = notes.map((note) => {
            const noteItem = document.createElement('note-item');
            noteItem.note = note;

            return noteItem;
        });
        Utils.emptyElement(noteListElement);
        noteListElement.append(...noteItems);
        Utils.hideElement(noteLoadingElement);
    }

    const showNote = (query) => {
        showLoading();
        const result = NotesApi.searchNote(query);
        displayResult(result);
        showNoteList();
    };

    const onSearchHandler = (event) => {
        event.preventDefault();

        const query = event.target.elements.name.value;
        showNote(query);
    };

    const displayResult = (notes) => {
        const noteItems = notes.map((note) => {
            const noteItem = document.createElement('note-item');
            noteItem.note = note;

            return noteItem;
        });

        Utils.emptyElement(noteListElement);
        noteListElement.append(...noteItems);
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

    const addNoteHandler = (event) => {
        event.preventDefault();
        const inputTitle = noteInputFormElement.elements.inputNoteTitle;
        const inputBody = noteInputFormElement.elements.noteBody;

        const note = {
            title: inputTitle.value,
            body: inputBody.value,
        }

        NotesApi.addNote(note);
        inputTitle.value = '';
        inputBody.value = '';
        loadNotes();
    }

    const onDeleteHandler = async (event) => {
        const { id } = event.detail;
        console.log(`home.js noteId: ${id}`);
        await NotesApi.deleteNote(id);
        loadNotes();
    }

    noteInputFormElement.addEventListener('submit', addNoteHandler);

    const customValidationTitleHandler = (event) => {
        event.target.setCustomValidity('');

        if (event.target.validity.valueMissing) {
            event.target.setCustomValidity('Note title is required.');
            return;
        }

        if (event.target.validity.tooShort) {
            event.target.setCustomValidity('Minimum length is 8 character.');
            return;
        }
    }

    noteInput.addEventListener('change', customValidationTitleHandler);
    noteInput.addEventListener('invalid', customValidationTitleHandler);

    noteInput.addEventListener('blur', (event) => {
        // Validate the field
        const isValid = event.target.validity.valid;
        const errorMessage = event.target.validationMessage;

        const connectedValidationId = event.target.getAttribute('aria-describedby');
        const connectedValidationEl = connectedValidationId
            ? document.getElementById(connectedValidationId)
            : null;

        if (connectedValidationEl && errorMessage && !isValid) {
            connectedValidationEl.innerText = errorMessage;
        } else {
            connectedValidationEl.innerText = '';
        }
    });

    noteListElement.addEventListener('delete', onDeleteHandler);

    searchFormElement.addEventListener('submit', onSearchHandler);
    loadNotes();
};

export default home;
