const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.error) {
        return responseJson.message;
      } else {
        return responseJson.data;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getArchiveNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      const responseJson = await response.json();
      if (responseJson.error) {
        return responseJson.message;
      } else {
        return responseJson.data;
      }
    } catch (error) {
      throw error;
    }
  }

  static async postArchiveNote(noteId) {
    console.log(`postAarchive: ${noteId}`);
    try {
      const options = {
        method: "POST",
      };
      const response = await fetch(
        `${BASE_URL}/notes/${noteId}/archive`,
        options,
      );
      const responseJson = await response.json();
      return responseJson.message;
    } catch (error) {
      throw error;
    }
  }

  static async postUnarchiveNote(noteId) {
    console.log(`postUnarchive: ${noteId}`);
    try {
      const options = {
        method: "POST",
      };
      const response = await fetch(
        `${BASE_URL}/notes/${noteId}/unarchive`,
        options,
      );
      const responseJson = await response.json();
      return responseJson.message;
    } catch (error) {
      throw error;
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
      return responseJson.message;
    } catch (error) {
      throw error;
    }
  }

  static async deleteNote(noteId) {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, options);
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}

export default NotesApi;
