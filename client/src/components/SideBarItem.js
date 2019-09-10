import React from 'react';

const SideBarItem = (props) => {
  return (
    <div>
      <div>{props.note.title}</div>
      <button>Delete</button>
    </div>
  )
}

export default SideBarItem;