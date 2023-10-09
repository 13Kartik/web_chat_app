import React, { useEffect,useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { UserContext } from "../context/UserContext";

function BotChatFooter() {
  const [message_text, set_message_text] = useState('');
  const { senderId,chatBotMessages,setChatBotMessages } = useContext(UserContext);

  const bot1='https://kartik1302-mistral-7b-instruct.hf.space/api/predict';
  const bot2='https://kartik1302-falcon-gpt4all-7b.hf.space/api/predict';

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

  const receive_message = (data) =>{
    //creating message and storing in local storage
    const new_message = {
        sender: 'ChatBot',
        type: 'text',
        data: data
      };
    setChatBotMessages(messages=>[...messages,new_message]);
  }

  const response = async (question,url=bot1) =>{
    // Create an AbortController instance
    const controller = new AbortController();
    const { signal } = controller;
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
                'Authorization': "Bearer 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",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
            signal,
        });
        const result = await response.json();
        receive_message(result.data[0].response);
    }
    catch(error){
      if (url===bot2) {
        // Handle other types of errors
        console.error("An error occurred:", error);
      } else {
        //slow but reliable
        console.log('using slow bot');
        response(question,bot2);        
      }
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