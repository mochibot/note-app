import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
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

  const logout = event => {
    event.preventDefault();
    props.logout();
    props.history.push('/')
  }

  return (
    <div>
      <Button onClick={logout}>Log out</Button>
      <Button type="primary" onClick={toggleAdd}>{isAddingNote ? 'Cancel' : 'Add note'}</Button>
      {isAddingNote && (
        <Form>
          <Input name='title' value={title} onChange={titleHandler} />
          <Button type="primary" onClick={addNote}>Submit</Button>
        </Form>
      )}
      {props.notes.map(item => 
        <SideBarItem 
          key={item.id} 
          note={item} 
          deleteNote={props.deleteNote} 
          selectNote={props.selectNote}
          selectedNote={props.selectedNote} />
      )}
    </div>
  )
}

export default withRouter(SideBar);