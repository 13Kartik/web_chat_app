import React, { useEffect,useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { UserContext } from "../context/UserContext";

function BotChatFooter() {
  const [message_text, set_message_text] = useState('');
  const { senderId,chatBotMessages,setChatBotMessages } = useContext(UserContext);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(message_text.trim() !== ''){
        send_message(message_text,'text');
        response(message_text);
      }
    }
  };

  const send_message = () => {
    const new_message = {
      sender: senderId,
      type: 'text',
      data: message_text 
    };
    set_message_text('');
    setChatBotMessages(messages=>[...messages,new_message]);
  };

  const response = async (question) =>{

    // Create an AbortController instance
    const controller = new AbortController();
    const { signal } = controller;

    const url = 'https://kartik1302-falcon-gpt4all-7b.hf.space/api/predict';

    // Define the input data
    const inputData = {
        "data": [
            question
          ] 
        };
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
            signal,
        });
        if (response.ok) {
            const result = await response.json();

            //creating message and storing in local storage
            const new_message = {
                sender: 'ChatBot',
                type: 'text',
                data: result.data[0].response 
              };
              setChatBotMessages(messages=>[...messages,new_message]);
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    }
    catch(error){
        console.error('Error:', error);
    }
    finally {
      // Clean up: abort the fetch request if the component is unmounted
      controller.abort();
    }
  };
  useEffect(() => {
    // Convert botMessages to JSON and store it in localStorage
    localStorage.setItem('chatBotMessages', JSON.stringify(chatBotMessages));
  }, [chatBotMessages]);

  return (
    <div className='chat-footer rounded' style={{height:'10%'}}>

      <InputGroup className='msg-type' style={{height:'100%'}}>
        <InputGroup.Text>

        </InputGroup.Text>

        <Form.Control
          value={message_text}
          onChange={(e) => set_message_text(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Message"
          className='rounded'
        />

        <InputGroup.Text>

        </InputGroup.Text>

      </InputGroup>
    </div>
  );
}

export default BotChatFooter;