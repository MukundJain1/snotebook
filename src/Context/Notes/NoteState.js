import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = 'https://snotebook-uwg4.onrender.com';
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  //GET NOTES

  const getNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${host}/api/notes/getNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Failed to fetch notes:", text);
        return;
      }
      const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        });
      };
      let notesFromServer = await response.json();

      // Format dates
      notesFromServer = notesFromServer.map(note => ({
        ...note,
        created_at: formatDate(note.created_at),
        updated_at: formatDate(note.updated_at)
      }));

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
      const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        });
      };

      if (!response.ok) {
        console.error("Failed to add note:", result.error || response.statusText);
        return;
      }

      // Format dates before setting state
      const formattedNote = {
        ...result,
        created_at: formatDate(result.created_at),
        updated_at: formatDate(result.updated_at)
      };

      setNotes(prevNotes => [...prevNotes, formattedNote]);
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
    const formattedDate = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    await response.json();
    // To implement later
    setNotes(prev =>
      prev.map(n => n.id === id
        ? { ...n, title, description, content, updated_at: formattedDate }
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
