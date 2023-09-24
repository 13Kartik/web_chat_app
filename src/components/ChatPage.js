import React, { useContext } from 'react'
import { Chat } from './ChatContainer';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import Introduction from './Introduction';
import {UserContext} from "../context/UserContext";

const ChatPage = ({ isMobile }) => {

  const { receiverId } = useContext(UserContext);

  return (
    <>
      { ( !isMobile || (isMobile && receiverId) ) ?
        <div className='chat-page'>
            {receiverId?
                    <>
                      <ChatHeader/>
                      <Chat/>
                      <ChatFooter/>  
                    </>
            :<Introduction/>
            }    
        </div>
        :''
      }
    </>
  )
}

export default ChatPage