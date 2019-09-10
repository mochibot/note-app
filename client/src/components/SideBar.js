import React, { useState } from 'react';
import firebase from '../config/firebase';
import SideBarItem from './SideBarItem';

const SideBar = (props) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [title, setTitle] = useState('');


  const titleHandler = event => {
    setTitle(event.target.value);
  }

  const toggleAdd = () => {
    setIsAddingNote(!isAddingNote);
  }

  const addNote = event => {
    event.preventDefault();
    props.addNote(title);
    setTitle('');
    setIsAddingNote(false);
  }

  const deleteNote = (id) => {
    firebase.firestore()
      .collection('notes')
      .doc(id)
      .delete();
  }

  return (
    <div>
      <button onClick={toggleAdd}>{isAddingNote ? 'Cancel' : 'Add note'}</button>
      {isAddingNote && (
        <div>
          <input name='title' value={title} onChange={titleHandler} />
          <button onClick={addNote}>Submit</button>
        </div>
      )}
      {props.notes.map(item => 
        <SideBarItem 
          key={item.id} 
          note={item} 
          deleteNote={deleteNote} 
          selectNote={props.selectNote} />
      )}
    </div>
  )
}

export default SideBar;