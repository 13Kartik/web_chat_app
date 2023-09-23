import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
  addDoc,
  or,
} from "firebase/firestore";
import Message from "./Message";
import {UserContext} from "../context/UserContext";

export let messagesRef = null;

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const states = useContext(UserContext);

  // Function to fetch messages
  const fetchData = async () => {
    try {
        // Access the chat_rooms collection
        const chat_rooms = collection(db, "chat_rooms");

        // Query for chat rooms with the specified participants
        const chat_room_query = query(
          chat_rooms,
          or(where("participants", "==",[states.senderId,states.receiverId]),
              where("participants", "==",[states.receiverId,states.senderId])));

        // Get the first chat room that matches the query
        const chat_room_snapshots = await getDocs(chat_room_query);

        if (chat_room_snapshots.empty) {
          const new_room = await addDoc(chat_rooms,{'participants':[states.senderId,states.receiverId]});
          messagesRef = collection(new_room,'messages');
          console.log('new room created');
        }
        else{
          const chat_room = chat_room_snapshots.docs[0];
          messagesRef = collection(chat_room.ref, "messages");
        }

        // Query and order messages by a timestamp
        const messageQuery = query(messagesRef, orderBy("timestamp"));

        // Set up a real-time listener for message updates
        const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
          const messageData = snapshot.docs.map((doc) => ({
            id: doc.id, // Include the document ID for React key
            ...doc.data(),
          }));
          setMessages(messageData);
        });

        // Return a cleanup function to unsubscribe when component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error("Error getting chat data:", error);
    }
  };  
  
  useEffect(() => {

    if(states.receiverId!=='')  fetchData();

  },[states.receiverId]);

  return (
    <div className='chat-container'>
      {messages.map((message) => (
        <Message key={message.id} text={message.text} sender={message.sender} />
      ))}
    </div>
  );
};
