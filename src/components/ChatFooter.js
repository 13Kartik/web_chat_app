import React, { useEffect, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// Import Firebase Firestore related modules
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase-config";
import Button from 'react-bootstrap/Button';

//storage
import { storage } from '../firebase-config';
import { v4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { lang_list } from '../context/LanguageCodes';

function ChatFooter() {
  const [message_text, set_message_text] = useState('');
  const {senderId,active_room_id, chat_rooms, translate, setTranslate } = useContext(UserContext);
  const [src,set_src] = useState('eng_Latn');
  const [tgt,set_tgt] = useState('hin_Deva');

  const [fileUpload,setFileUpload] = useState(null);

  const handleSourceChange = (event) => {
    set_src(event.target.value); // Update src state with the selected value
  };

  const handleTargetChange = (event) => {
    set_tgt(event.target.value); // Update src state with the selected value
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(message_text.trim() !== '') send_message(message_text,'text');
    }
  };

  //translate
  async function translator() {
    const url = 'https://kartik1302-facebook-nllb-600m-gradio.hf.space/api/predict';

    // Define the input data
    const inputData = {
    "data": [
      src,
      tgt,
      message_text,
      ] 
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });

        if (response.ok) {
            const result = await response.json();
            set_message_text(result.data[0].text);
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const send_message = async (data,type) => {
    console.log('I am Active');
    const chat_room = chat_rooms.find((room)=>room.id===active_room_id);
    chat_room.messages.push({
      sender: senderId,
      type: type, //'text',
      data: data //message_text
    });

    try{
      const chat_room_ref = doc(db,'chat_rooms',active_room_id);
      await updateDoc(chat_room_ref,chat_room);
      set_message_text(''); // Clear the input field after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const upload_file = async (event) =>{
      console.log('I am active');
      setFileUpload(event.target.files[0]);
  };

  useEffect(()=>{
    if (fileUpload !== null){
      const fileRef = ref(storage, `${active_room_id}/files/${fileUpload.name + v4()}`);
      uploadBytes(fileRef, fileUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          send_message(url,'file');
          console.log(url);
        });
      });
    }
  },[fileUpload]);

  return (
    <div className='chat-footer rounded' style={{height:`${translate?'20%':'10%'}`}}>

      <div className='translation-options' style={{display:`${translate?'flex':'none'}`}}>
        <Form.Select value={src} onChange={handleSourceChange}>
          {Object.keys(lang_list).map((key) => (
            <option key={key} value={lang_list[key]}>{key}</option>
          ))}
        </Form.Select>

        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-arrow-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
        </svg>

        <Form.Select value={tgt} onChange={handleTargetChange}>
          {Object.keys(lang_list).map((key) => (
            <option key={key} value={lang_list[key]}>{key}</option>
          ))}
        </Form.Select>

        <Button variant='info' className='fs-5' onClick={translator}>Translate</Button>
      </div>

      <InputGroup className='msg-type' style={{height:`${translate?'50%':'100%'}`}}>
        <InputGroup.Text>
            <label htmlFor='file-upload' className='btn'>
              <input id='file-upload' onChange={upload_file} type='file' style={{display:'none'}}/>
              <svg style={{color:"#0d6efd"}} xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
              </svg>
            </label>
        </InputGroup.Text>

        <Form.Control
          value={message_text}
          onChange={(e) => set_message_text(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Message"
          className='rounded'
        />

        <InputGroup.Text>
          <Button variant="outline-primary" onClick={()=>{setTranslate(!translate)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-translate" viewBox="0 0 16 16">
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
              <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
            </svg>
          </Button>
        </InputGroup.Text>

      </InputGroup>
    </div>
  );
}

export default ChatFooter;