import React from 'react';

const SideBarItem = (props) => {
  
  const deleteNote = (event) => {
    event.preventDefault();
    props.deleteNote(props.note.id);
  }

  return (
    <div>
      <div>{props.note.title}</div>
      <button onClick={deleteNote}>Delete</button>
    </div>
  )
}

export default SideBarItem;