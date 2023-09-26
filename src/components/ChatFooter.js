import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Import Firebase Firestore related modules
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase-config";

import {room_index} from "./ChatContainer";

function ChatFooter() {
  const [message_text, set_message_text] = useState('');
  const {senderId, chat_rooms } = useContext(UserContext);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      send_message();
    }
  };

  const send_message = async () => {
    if (message_text.trim() === '') return;

    const room_id = chat_rooms[room_index].id;
    console.log(room_id);

    const chat_room = chat_rooms[room_index];
    chat_room.messages.push({
      sender: senderId,
      text: message_text
    });

    try{
      const chat_room_ref = doc(db,'chat_rooms',room_id);
      await updateDoc(chat_room_ref,chat_room);
      set_message_text(''); // Clear the input field after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='chat-footer rounded'>
      <InputGroup className='msg-type'>
        <Form.Control
          value={message_text}
          onChange={(e) => set_message_text(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Message"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2" onClick={send_message} className='btn btn-primary fs-5 text-light'>Send</InputGroup.Text>
      </InputGroup>
    </div>
  );
}

export default ChatFooter;