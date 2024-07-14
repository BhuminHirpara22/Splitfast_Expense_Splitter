import React, { useState } from 'react';
import HomePage from './components/HomePage';
import GroupPage from './components/GroupPage';
import socket from './socket';
import './App.css';

const App = () => {
  const [groupName, setGroupName] = useState('');//using usestate to store group name as it gets updated
  const [userName, setUserName] = useState('');//using usestate to store user name as it gets updated
  const [isInGroup, setIsInGroup] = useState(false);//Checking whether the user has logged in or not

  //Logging the user in group page
  const handleGroupAction = (group, user) => {
    setGroupName(group);
    setUserName(user);
    setIsInGroup(true);
  };

  return (
    <div className="app">
      <header>
        <h1>SplitFast</h1>
      </header>
      <div className="container">
        <div className="content">
          {isInGroup ? (
            <GroupPage groupName={groupName} userName={userName} socket={socket} />
          ) : (
            <HomePage handleGroupAction={handleGroupAction} socket={socket} />
          )}
        </div>
      </div>
      <footer>
        <p>&copy; 2024 SplitFast. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
