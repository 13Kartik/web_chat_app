import React, { useEffect, useContext } from 'react'
import User from './UserItem'
import Bot from '../bot_components/BotItem';
import ListGroup from 'react-bootstrap/ListGroup';
import { UserContext } from "../context/UserContext";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

function UserNav() {

  const {user_list,set_user_list,senderId} = useContext(UserContext);

  const remove_sender = (e) => {
    return e.id !== senderId;
  }

  useEffect(()=>{
    try{
      const users = collection(db,'users');
    
      const users_query = query(users);

      const unsubscribe = onSnapshot(users_query, (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data(),
        }));
        const filtered_data=usersData.filter(remove_sender);
        set_user_list(filtered_data);
      });
      // Return a cleanup function to unsubscribe when component unmounts
      return () => unsubscribe();
    }
    catch(err){
      console.error(err);
    }
  },[]);

  return (
    <div className='user-container'>   
      <ListGroup>
          <Bot key='ChatBot' info={{id:'ChatBot',username:'Chat Bot',userPic:'https://firebasestorage.googleapis.com/v0/b/web-chat-app-a23a3.appspot.com/o/Bot%2Fbot_icon.png?alt=media&token=f4c2d539-f341-4fd4-9bad-0ae2569878d1&_gl=1*13ud779*_ga*MTc3MDk4NTkxMy4xNjk0NzgyODIy*_ga_CW55HF8NVT*MTY5NjI3MDcwNS41My4xLjE2OTYyNzA4MDguMjIuMC4w'}}/> 
          {user_list.map((user_obj)=>{
              return <User key={user_obj.id} info={user_obj}/>
          })}
      </ListGroup>
    </div>
  )
}

export default UserNav