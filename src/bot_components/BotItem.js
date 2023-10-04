import React,{ useContext, useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { UserContext } from '../context/UserContext';

function Bot({info}) {
    const {receiverId,setReceiverId,setReceiverName,setReceiverPic,setIsBot,chatBotMessages} = useContext(UserContext);
    const [last_message,set_last_message] = useState(''); 

    const change_room = (bot) =>{
        setReceiverId(bot.id);
        setReceiverName(bot.username);
        setReceiverPic(bot.userPic);
        setIsBot(true);
    }

    useEffect(()=>{
        try{
            set_last_message(chatBotMessages[chatBotMessages.length-1].data);
        }
        catch(err){
            //ignore xd
        }
    },[chatBotMessages]);

  return (
    <ListGroup.Item key={info.id} onClick={()=>{change_room(info)}} style={{backgroundColor:'#2d3339',border:'0'}} className={`user-item btn mb-1 text-light ${info.id===receiverId ? 'active' : ''}`}>
        <div className='user'>
            <div className='profile-pic'>
                <img src={info.userPic} alt='user pic'/>
            </div>
            <div className='user-text'>
                <div className='user-name'>
                    {info.username}
                </div>
                <div className='user-last-message'>
                    {last_message}
                </div>
            </div>
        </div>
    </ListGroup.Item>
  )
}

export default Bot
