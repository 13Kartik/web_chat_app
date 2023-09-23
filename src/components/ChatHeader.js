import React, {useContext, useEffect} from 'react'
import {UserContext} from "../context/UserContext";

function ChatHeader() {
  const { receiverName,receiverPic } = useContext(UserContext);

  useEffect(() => {
  }, [receiverPic,receiverName]);

  return (
    <div className='chat-header bg-primary rounded-end'>
        <div className='profile-pic ms-2'>
            <img src={receiverPic} alt='pic'/>
        </div>
        <div className='user-name text-light ms-2 fs-5'>
          {receiverName} 
        </div>
    </div>
  )
}

export default ChatHeader
