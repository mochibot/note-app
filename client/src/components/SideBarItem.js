import React from 'react';
import { Button, List } from 'antd';

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
    <List.Item style={props.selectedNote && (props.selectedNote.id === props.note.id) ? {background: 'rgb(179, 201, 185)'} : {background: 'white'}}>
      <List.Item.Meta 
        onClick={selectNote}
        title={props.note.title}
        description={removeHTMLTags(props.note.content).slice(0, 20) + '...'} />
      <Button type='danger' icon="delete" size='small' onClick={deleteNote} />
    </List.Item>
  )
}

export default SideBarItem;