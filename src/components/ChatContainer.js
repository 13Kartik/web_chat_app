import React, { useEffect, useState, useContext } from "react";
import Message from "./Message";
import {UserContext} from "../context/UserContext";
import { db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const {senderId,receiverId,set_active_room_id,chat_rooms,translate} = useContext(UserContext);
  
  useEffect(() => {
    try{
      if(receiverId!==''){
        const current_room = chat_rooms.find((room) => room.participants.includes(receiverId));

        if(current_room){
            setMessages(current_room.messages);
            set_active_room_id(current_room.id);
        }
        else{
            const new_room = { 'participants':[senderId,receiverId],'messages':[] }
            const id = addDoc(collection(db,'chat_rooms'),new_room);
            setMessages([]);
            set_active_room_id(id);
        }
      };
    }
    catch(err){
      console.error(err);
    }
  },[chat_rooms,receiverId]);

  return (
    <div className='chat-container' style={{height:`${translate?'70%':'80%'}`}}>
      {messages.map((message,index) => (
        <Message key={index} props={message}/>
      ))}
    </div>
  );
};
