import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Import Firebase Firestore related modules
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { messagesRef } from './ChatContainer';

import { UserContext } from "../context/UserContext";

function ChatFooter() {
  const [message_text, set_message_text] = useState('');
  const {senderId} = useContext(UserContext);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      send_message();
    }
  };

  const send_message = async () => {
    if (message_text.trim() === '') {
      return; // Don't send empty messages
    }
    const message = {
      text: message_text,
      sender: senderId,
      timestamp: serverTimestamp(), // Set the timestamp with serverTimestamp()
    };
    try{
      await setDoc(doc(messagesRef), message);
      set_message_text(''); // Clear the input field after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='chat-footer'>
      <InputGroup className="m-3">
        <Form.Control
          value={message_text}
          onChange={(e) => set_message_text(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Message"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2" onClick={send_message} className='btn btn-primary fs-5 fw-3 text-light'>Send</InputGroup.Text>
      </InputGroup>
    </div>
  );
}

export default ChatFooter;