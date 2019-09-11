import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';

const Editor = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [error, setError] = useState('')

  useEffect(() => {
    if (props.selectedNote) {
      setError('');
      setTitle(props.selectedNote.title);
      setContent(props.selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [props.selectedNote])

  const titleHandler = event => {
    setError('');
    setTitle(event.target.value);
  }

  const textHandler = text => {
    setError('');
    setContent(text);
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];

  const updateNote = (event) => {
    event.preventDefault();
    if (!props.selectedNote) {
      setError('No note was selected');
    } else {
      let updates = {
        title: title,
        content: content
      }
      props.updateNote(props.selectedNote.id, updates);
    }
  }

  return (
    <div>
      <input name='title' value={title} onChange={titleHandler}/>
      <ReactQuill value={content} onChange={textHandler} modules={modules} formats={formats}/>
      <button onClick={updateNote} >Save</button>
      {error && <div>{error}</div>}
    </div>
  )
}

export default Editor;