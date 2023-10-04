import React, { useContext } from 'react'
import { Chat } from './ChatContainer';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import Introduction from './Introduction';
import {UserContext} from "../context/UserContext";

//Bot
import { BotChat } from '../bot_components/BotChatContainer';
import BotChatFooter from '../bot_components/BotChatFooter'

const ChatPage = ({ isMobile }) => {

  const { receiverId,isBot } = useContext(UserContext);

  return (
    <>
      { ( !isMobile || (isMobile && receiverId) ) ?
        <div className='chat-page'>
            {receiverId?
                    <>
                      <ChatHeader/>
                      {isBot?
                        <>
                        <BotChat/>
                        <BotChatFooter/>
                        </>
                      :
                        <>
                        <Chat/>
                        <ChatFooter/>  
                        </>
                      }
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