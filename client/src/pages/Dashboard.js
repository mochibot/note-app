import React, { useState, useEffect } from 'react';
import firebase from '../config/firebase';
import SideBar from '../components/SideBar';
import Editor from '../components/Editor';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    firebase.firestore()
      .collection('notes')
      .onSnapshot(response => {
        const notes = response.docs.map(item => {
          const data = item.data();
          data['id'] = item.id;
          return data;
        })
        console.log(notes);
        setNotes(notes);
      })
  }, [])

  const addNote = (title) => {
    firebase.firestore()
      .collection('notes')
      .add({
        title: title,
        content: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(response => {
        const newNoteIndex = notes.indexOf(notes.find(item => item.id === response.id));
        setSelectedNote(notes[newNoteIndex]);
        setSelectedIndex(newNoteIndex);
      })
      .catch(error => {
        setError(error.message);
      })
  }

  return (
    <div>
      <div>
        <SideBar notes={notes} addNote={addNote} />
        <Editor />
      </div>
    </div>
  )
}

export default Dashboard;