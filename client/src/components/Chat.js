import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useUser } from '../contexts/UserContext';

const socket = io('https://chatapp-3ew6.onrender.com');
axios.get('https://chatapp-3ew6.onrender.com/api/messages');


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useUser();

  useEffect(() => {
    axios.get('http://localhost:5000/api/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => socket.off('newMessage');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      text: newMessage,
      sender: user.username,
      timestamp: new Date()
    };

    socket.emit('sendMessage', message);
    setNewMessage('');
  };

  return (
    <div className="chat-page">
      <h2>Chat Room</h2>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender === user.username ? 'sent' : 'received'}`}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;