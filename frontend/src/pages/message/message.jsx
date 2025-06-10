import React from 'react';
import './msg.css';
import LeftSidebar from '../home/leftBar/LeftSidebar';
import ChatBox from './ChatBox';

const dummyUsers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  username: `user${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
}));

export default function Message() {
  return (
    <div className="message-box">
      <div className="left">
        <LeftSidebar />
      </div>
      <div className="message-box-middle">
        <ul className="user-list">
          {dummyUsers.map(u => (
            <li key={u.id} className="user-item">
              <img src={u.avatar} alt={u.username} />
              <span>{u.username}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="message-box-right">
        <ChatBox
          user={{
            username: 'user1',
            avatar: 'https://i.pravatar.cc/150?img=1',
          }}
        />
      </div>
    </div>
  );
}
