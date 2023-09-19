import React,{ useContext } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { UserContext } from '../context/UserContext';

function User({info}) {
    const {setReceiverId,setReceiverName,setReceiverPic} = useContext(UserContext);
    const change_room = (user) =>{
        setReceiverId(user.id);
        setReceiverName(user.username);
        setReceiverPic(user.userPic);
    }

  return (
    <ListGroup.Item key={info.id} onClick={()=>{change_room(info)}} className='btn'>
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
