import React, { useState } from 'react';
import ReactQuill from 'react-quill';


const Editor = () => {
  const [input, setInput] = useState({
    title: '',
    content: '',
    id: ''
  });

  const titleHandler = event => {
    setInput({
      title: event.target.value
    })
  }

  const textHandler = text => {
    setInput({
      content: text
    });
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

  return (
    <div>
      <input name='title' value={input.title} onChange={titleHandler}/>
      <ReactQuill value={input.content} onChange={textHandler} modules={modules} formats={formats}/>
    </div>
  )
}

export default Editor;