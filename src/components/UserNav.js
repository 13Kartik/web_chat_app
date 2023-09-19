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

  const get_users = async () =>{
    const users = collection(db,'users');
    
    const users_query = query(users);

    // Set up a real-time listener for message updates
    const unsubscribe = onSnapshot(users_query, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID for React key
        ...doc.data(),
      }));
      const filtered_data=usersData.filter(remove_sender);
      set_user_list(filtered_data);
      console.log(filtered_data);
    });

    // Return a cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }

  useEffect(()=>{
    try{
      get_users();
    }
    catch(err){
      console.error(err);
    }
  },[]);

  return (
    <ListGroup>
        {user_list.map((user_obj)=>{
            return <User key={user_obj.id} info={user_obj}/>
        })}
    </ListGroup>
  )
}

export default UserNav