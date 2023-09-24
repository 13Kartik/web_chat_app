import React, {useContext, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import {UserContext} from "../context/UserContext";

function ChatHeader() {
  const { receiverName, setReceiverId, receiverPic } = useContext(UserContext);

  const goBack = () => {
      setReceiverId('');
  };

  useEffect(() => {
  }, [receiverPic,receiverName]);

  return (
    <div className='chat-header bg-primary rounded-end'>
        <div className='back-btn'>
          <Button className='ms-1' onClick={ ()=>{goBack()} }>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
          </Button>
        </div>

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
