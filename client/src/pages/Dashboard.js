import React, { useState, useEffect } from 'react';
import firebase from '../config/firebase';
import SideBar from '../components/SideBar';
import Editor from '../components/Editor';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    firebase.firestore()
      .collection('notes')
      .orderBy("lastEditedAt", "desc")
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
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastEditedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(response => {
        return firebase.firestore()
          .collection('notes')
          .doc(response.id)
          .get()
          .then(snapshot => {
            const newNote = snapshot.data();
            newNote['id'] = response.id;
            setSelectedNote(newNote);
          })
          .catch(error => {
            console.log(error.message);
          }) 
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const selectNote = (note) => {
    setSelectedNote(note);
  }

  const updateNote = (id, updates) => {
    firebase.firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: updates.title,
        content: updates.content,
        lastEditedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  const deleteNote = (id) => {
    firebase.firestore()
      .collection('notes')
      .doc(id)
      .delete()
      .then(() => {
        setSelectedNote(null);
      })
  }

  const logout = () => {
    firebase.auth().signOut();
  }

  return (
    <div>
      <div>
        <SideBar 
          notes={notes} 
          addNote={addNote}
          selectNote={selectNote}
          deleteNote={deleteNote} 
          logout={logout} />
        <Editor 
          notes={notes}
          selectedNote={selectedNote}
          updateNote={updateNote}  />
      </div>
    </div>
  )
}

export default Dashboard;