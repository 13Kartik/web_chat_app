import React,{ useContext, useEffect } from 'react'
import NavHeader from './NavHeader';
import UserNav from './UserNav';
import {UserContext} from "../context/UserContext";
import { db } from "../firebase-config";
import {
  query,
  where,
  onSnapshot,
  collection,
} from "firebase/firestore";

const NavPage = ({ isMobile }) => {

    const { receiverId, senderId, set_chat_rooms, set_last_messages } = useContext(UserContext);

    const get_last_messages = (rooms) =>{
        const last_messages = rooms.map((room)=>{
          return [room.participants,room.messages[room.messages.length-1]];
        });
        set_last_messages(last_messages);
    }

    useEffect(() => {
      try {
        const chat_room_ref = collection(db,'chat_rooms');
        const chat_rooms_query = query(chat_room_ref,where("participants", "array-contains", senderId));

        const unsubscribe = onSnapshot(chat_rooms_query, (snapshot) => {
          const chat_rooms = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          set_chat_rooms(chat_rooms);
          get_last_messages(chat_rooms);
        });
        return () => unsubscribe();
        }
        catch (error) {
        console.error("Error getting chat data:", error);
        }
    }, []);

  return (
    <>
        { ( !isMobile || (isMobile && !receiverId) ) ?
            <div className='nav-page'>
                <NavHeader/>
                <UserNav/>
            </div>
            :''
        }
    </>
  )
}

export default NavPage