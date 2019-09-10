import React, { useState } from 'react';
import ReactQuill from 'react-quill';


const Editor = () => {
  const [text, setText] = useState('');

  const changeHandler = input => {
    setText(input);
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
      <ReactQuill value={text} onChange={changeHandler} modules={modules} formats={formats}/>
    </div>
  )
}

export default Editor;