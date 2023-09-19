import React, {useContext, useEffect} from 'react'
import {UserContext} from "../context/UserContext";

function ChatHeader() {
  const { receiverName,receiverPic } = useContext(UserContext);

  useEffect(() => {
  }, [receiverPic,receiverName]);

  return (
    <div className='chat-header'>
        <div className='profile-pic ms-2'>
            <img src={receiverPic} alt='user pic'/>
        </div>
        <div className='user-name ms-2 fs-5'>
          {receiverName} 
        </div>
    </div>
  )
}

export default ChatHeader
