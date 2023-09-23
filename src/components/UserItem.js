import React,{ useContext } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { UserContext } from '../context/UserContext';

function User({info}) {
    const {receiverId,setReceiverId,setReceiverName,setReceiverPic} = useContext(UserContext);
    const change_room = (user) =>{
        setReceiverId(user.id);
        setReceiverName(user.username);
        setReceiverPic(user.userPic);
    }
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
                    {/* Last Message */}
                </div>
            </div>
        </div>
    </ListGroup.Item>
  )
}

User.propTypes = {}

export default User
