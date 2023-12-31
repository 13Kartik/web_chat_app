import React,{ useContext, useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { UserContext } from '../context/UserContext';

function User({info}) {
    const {receiverId,setReceiverId,setReceiverName,setReceiverPic,last_messages,setIsBot} = useContext(UserContext);
    const [last_message,set_last_message] = useState(''); 

    const change_room = (user) =>{
        setReceiverId(user.id);
        setReceiverName(user.username);
        setReceiverPic(user.userPic);
        setIsBot(false);
    }

    useEffect(()=>{
        try{
            const msg_obj = last_messages.filter((message)=>{
                return message[0].includes(info.id);
            });
            if(msg_obj.length){
                if(msg_obj[0][1].type==='text')
                    set_last_message(msg_obj[0][1].data);
                else
                    set_last_message('file....');
            }
        }
        catch(err){
            //ignore error xd
        }
    },[last_messages]);

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

User.propTypes = {}

export default User
