import Utils from "../utils.js";
import NotesApi from "../data/remote/notes-api.js";

const home = () => {
  let notes = [];
  let archiveNotes = [];
  const overlay = document.getElementById("overlay");
  const searchFormElement = document.querySelector("#searchForm");
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteLoadingElement =
    noteListContainerElement.querySelector(".search-loading");
  const noteListElement = noteListContainerElement.querySelector("note-list");
  const archiveNoteListElement = noteListContainerElement.querySelector(
    "note-list#archiveNoteList",
  );
  const noteInputFormElement = document.getElementById("input-note");
  const noteInput = noteInputFormElement.elements.title;

  const showProgressBar = (isShow) => {
    if (isShow) {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  const loadNotes = async () => {
    showProgressBar(true);
    try {
      const result = await NotesApi.getNotes();
      if (result.status === "success") {
        notes = result.data;
      }
    } catch (error) {
      showProgressBar(false);
      showResponseMessage(error);
    }

    try {
      const result = await NotesApi.getArchiveNotes();
      if (result.status === "success") {
        archiveNotes = result.data;
      }
    } catch (error) {
      showProgressBar(false);
      showResponseMessage(error);
    }

    const noteItems = notes.map((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.note = note;

      return noteItem;
    });
    const archiveNoteItems = archiveNotes.map((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.note = note;

      return noteItem;
    });

    Utils.emptyElement(noteListElement);
    Utils.emptyElement(archiveNoteListElement);

    noteListElement.append(...noteItems);
    archiveNoteListElement.append(...archiveNoteItems);
    Utils.hideElement(noteLoadingElement);
    setTimeout(() => showProgressBar(false), 500);
  };

  const searchNote = (query) => {
    return notes.filter((note) => {
      const loweredCaseNoteTitle = (note.title || "-").toLowerCase();
      const jammedNoteTitle = loweredCaseNoteTitle.replace(/\s/g, "");

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, "");

      return jammedNoteTitle.indexOf(jammedQuery) !== -1;
    });
  };

  const showNote = (query) => {
    showLoading();
    const result = searchNote(query);
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
      const noteItem = document.createElement("note-item");
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

  const addNoteHandler = async (event) => {
    event.preventDefault();
    const inputTitle = noteInputFormElement.elements.inputNoteTitle;
    const inputBody = noteInputFormElement.elements.noteBody;

    const note = {
      title: inputTitle.value,
      body: inputBody.value,
    };

    await NotesApi.addNote(note);
    inputTitle.value = "";
    inputBody.value = "";
    loadNotes();
  };

  const onDeleteHandler = async (event) => {
    const { id } = event.detail;
    await NotesApi.deleteNote(id);
    await loadNotes();
  };

  const onToggleArchiveHandler = async (event) => {
    const { id, isArchive } = event.detail;
    if (isArchive) {
      await NotesApi.postUnarchiveNote(id);
    } else {
      await NotesApi.postArchiveNote(id);
    }
    loadNotes();
  };

  noteInputFormElement.addEventListener("submit", addNoteHandler);

  const customValidationTitleHandler = (event) => {
    event.target.setCustomValidity("");

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Note title is required.");
      return;
    }

    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("Minimum length is 8 character.");
    }
  };

  noteInput.addEventListener("change", customValidationTitleHandler);
  noteInput.addEventListener("invalid", customValidationTitleHandler);

  noteInput.addEventListener("blur", (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });

  noteListElement.addEventListener("delete", onDeleteHandler);
  noteListElement.addEventListener("toggleArchive", onToggleArchiveHandler);
  archiveNoteListElement.addEventListener("delete", onDeleteHandler);
  archiveNoteListElement.addEventListener(
    "toggleArchive",
    onToggleArchiveHandler,
  );

  searchFormElement.addEventListener("submit", onSearchHandler);
  loadNotes();
};

export default home;
