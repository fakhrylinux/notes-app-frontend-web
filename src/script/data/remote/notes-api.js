const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.eror) {
        showResponseMessage(responseJson.message);
      } else {
        return responseJson.data;
      }
    } catch (error) {
      showResponseMessage(error);
    }
  }

  static async addNote(note) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      };

      const response = await fetch(`${BASE_URL}/notes`, options);
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
      // this.getNotes();
    } catch (error) {
      // showResponseMessage(error);
    }
  }

  static async deleteNote(noteId) {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, options);
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
    } catch (error) {
      // showResponseMessage(error);
    }
  }

  showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };
}

export default NotesApi;
