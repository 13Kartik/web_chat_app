import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { UserContext } from "../context/UserContext";

function Message(props) {
  const { senderId } = useContext(UserContext);

  const isMe = (id) => {
    return id === senderId ? 'me' : 'not-me';
  }

  return (
    <>
    <div className={`d-flex ${isMe(props.sender)}`}>
      <Card bg='primary' text='light' className='message mb-2 ps-1 pe-1 w-auto h-auto'>
        <Card.Body>
          {/* <Card.Title>{props.sender}</Card.Title> */}
          <Card.Text>
            {props.text}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>

    <div className='d-flex'>
        <div className='message'>

        </div>
    </div>

    </>

  );
}

export default Message;
