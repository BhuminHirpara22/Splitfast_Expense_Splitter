import React, { useState } from 'react';

const HomePage = ({ handleGroupAction, socket }) => {
    const [tittle, setTittle] = useState('Welcome to Expense Splitter')//using usestate to store tittle as it gets updated
    const [groupName, setGroupName] = useState('');//using usestate to store group name as it gets updated
    const [userName, setUserName] = useState('');//using usestate to store user name as it gets updated

    //Creates group and enters user into group page.
    const handleCreateGroup = async () => {
        if (groupName && userName) {
            socket.emit('createGroup',{roomName:groupName,userName:userName});
            socket.on('joinMessage',(message)=>{
                console.log(message);
                handleGroupAction(groupName,userName);
            });
            socket.on('joinError',(message) =>{
                setTittle(message);
            });
        }else{
            setTittle('group name or user name is empty');
        }
    };

    //Joins user in a pre-existing group
    const handleJoinGroup = () => {
        if (groupName && userName) {
            console.log("joining");
            socket.emit('joinGroup',{roomName:groupName,userName:userName});
            socket.on('joinMessage',(message)=>{
                console.log(message);
                handleGroupAction(groupName,userName);
            });
            socket.on('joinError',(message) =>{
                setTittle(message);
            });
        }else{
            setTittle('group name or user name is empty');
        }
    };

    return (
        <div className='homepage'>
            <h2>{tittle}</h2>
            <div className='form-group'>
                <label htmlFor="group">Group Name:</label>
                <input
                    type="text"
                    id="group"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                />
            </div>
            <div className='form-group'>
                <label htmlFor="user">User Name:</label>
                <input
                    type="text"
                    id="user"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>
            <div className='button-group'>
                <button onClick={handleCreateGroup}>Create Group</button>
                <button onClick={handleJoinGroup}>Join Group</button>
            </div>
        </div>
    );
};

export default HomePage;
