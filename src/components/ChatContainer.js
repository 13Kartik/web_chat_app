import React, { useEffect, useState, useContext } from "react";
import Message from "./Message";
import {UserContext} from "../context/UserContext";
import { db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

export let room_index = null;

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const {senderId,receiverId,chat_rooms} = useContext(UserContext);
  
  useEffect(() => {
    try{
      if(receiverId!==''){
        const current_room = chat_rooms.find((room) => room.participants.includes(receiverId));

        if(current_room){
            setMessages(current_room.messages);
            room_index = chat_rooms.indexOf(current_room);
        }
        else{
            const new_room = { 'participants':[senderId,receiverId],'messages':[] }
            addDoc(collection(db,'chat_rooms'),new_room);
            setMessages([]);
            room_index = chat_rooms.indexOf(new_room);
        }
      };
    }
    catch(err){
      console.error(err);
    }
  },[chat_rooms,receiverId]);

  return (
    <div className='chat-container'>
      {messages.map((message,index) => (
        <Message key={index} text={message.text} sender={message.sender} />
      ))}
    </div>
  );
};
