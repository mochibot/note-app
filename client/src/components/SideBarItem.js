import React from 'react';

const SideBarItem = (props) => {
  
  const deleteNote = (event) => {
    event.preventDefault();
    props.deleteNote(props.note.id);
  }

  const selectNote = (event) => {
    event.preventDefault();
    props.selectNote(props.note);
  }

  const removeHTMLTags = str => str.replace(/<[^>]*>?/gm, '');

  return (
    <div>
      <div onClick={selectNote}>{props.note.title}</div>
      <div>{removeHTMLTags(props.note.content).slice(0, 30) + '...'}</div>
      <button onClick={deleteNote}>Delete</button>
    </div>
  )
}

export default SideBarItem;