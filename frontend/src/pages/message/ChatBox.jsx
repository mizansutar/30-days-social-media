import React, { useState, useEffect, useRef } from 'react';
import './msg.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const generateDummyMsgs = count =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    author: Math.random() > 0.5 ? 'me' : 'them',
    text: `Dummy message ${i + 1}`,
    timestamp: new Date(Date.now() - (count - i) * 60000)
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }));

export default function ChatBox({ user }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    setMsgs(generateDummyMsgs(25));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [msgs]);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMsgs(prev => [
      ...prev,
      {
        id: prev.length + 1,
        author: 'me',
        text: input,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
    setInput('');
  };

  return (
    <>
      <div className="chat-header">
        <img src={user.avatar} alt={user.username} className="chat-avatar" />
        <h3 className="chat-username">{user.username}</h3>
      </div>

      <div className="chat-content">
        {msgs.map(msg => (
          <div
            key={msg.id}
            className={`chat-message ${msg.author === 'me' ? 'mine' : 'theirs'}`}
          >
            <p>{msg.text}</p>
            <span className="msg-time">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-wrapper">
        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="standard"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMsg()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={sendMsg} disabled={!input.trim()} sx={{ color: '#0ef' }}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </>
  );
}
