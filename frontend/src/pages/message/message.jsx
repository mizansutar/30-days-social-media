import React, { useState } from 'react';
import './msg.css';
import LeftSidebar from '../home/leftBar/LeftSidebar';
import ChatBox from './ChatBox';

const dummyUsers = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  username: `user${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
}));

export default function Message() {
  const [selectedUser, setSelectedUser] = useState(dummyUsers[0]);

  return (
    <div className="message-box">
      <div className="left">
        <LeftSidebar />
      </div>

      <div className="message-box-middle">
        <ul className="user-list">
          {dummyUsers.map((u) => (
            <li
              key={u.id}
              className={`user-item ${selectedUser?.id === u.id ? 'active' : ''}`}
              onClick={() => setSelectedUser(u)}
            >
              <img src={u.avatar} alt={u.username} />
              <span>{u.username}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="message-box-right">
        {selectedUser ? (
          <ChatBox user={selectedUser} />
        ) : (
          <p style={{ padding: '2rem' }}>Select a conversation</p>
        )}
      </div>
    </div>
  );
}
