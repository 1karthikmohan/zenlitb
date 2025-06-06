import React, { useState } from 'react';

const dummyMessages = [
  { id: 1, from: 'Alice', text: 'Hi there!' },
  { id: 2, from: 'Bob', text: 'Hello!' }
];

function Chat() {
  const [messages, setMessages] = useState(dummyMessages);
  const [text, setText] = useState('');

  function handleSend(e) {
    e.preventDefault();
    const newMessage = { id: Date.now(), from: 'You', text };
    setMessages([...messages, newMessage]);
    setText('');
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chat</h2>
      <div>
        {messages.map((m) => (
          <div key={m.id}><strong>{m.from}:</strong> {m.text}</div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
