import React, { useEffect, useContext } from 'react'
import User from './UserItem'
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
          {user_list.map((user_obj)=>{
              return <User key={user_obj.id} info={user_obj}/>
          })}
      </ListGroup>
    </div>
  )
}

export default UserNav