import React from 'react';
import SideBar from '../components/SideBar';
import Editor from '../components/Editor';

const Dashboard = () => {
  return (
    <div>
      <div>
        <SideBar />
        <Editor />
      </div>
    </div>
  )
}

export default Dashboard;