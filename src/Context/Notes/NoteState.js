import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  //GET NOTES

  const getNotes = async () => {
  try {
    const response = await fetch(`${host}/api/notes/getNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    if (!response.ok) {
      const text = await response.text();            // read plain-text error
      console.error("Failed to fetch notes:", text);
      return;                                        // bail out
    }

    const notesFromServer = await response.json();   // now safe to parse JSON
    setNotes(notesFromServer);

  } catch (err) {
    console.error("Network or parsing error:", err);
  }
};
  //ADD NOTE

  const addNote = async (title, description, content) => {
    try {
      const response = await fetch(`${host}/api/notes/addNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, content }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Failed to add note:", result.error || response.statusText);
        return;
      }
      // Assuming result contains the new note object
      setNotes(prevNotes => [...prevNotes, result]);
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    // To implement late
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };


  // EDIT NOTE
  const editNote = async (id, title, description, content) => {
    // API call 
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, content }),
    });
    await response.json();
    // To implement later
    setNotes(prev =>
      prev.map(n => n.id === id
        ? { ...n, title, description, content, updated_at: new Date().toISOString() }
        : n
      )
    );
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
