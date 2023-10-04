import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { UserContext } from '../context/UserContext';

function Message(props) {
  const { senderId } = useContext(UserContext);

  const isMe = (id) => {
    return id === senderId ? 'me' : 'not-me';
  }

  return (
    <div className={`d-flex ${isMe(props.sender)}`}>
      <Card bg='primary' text='light' className='message mb-2 ps-1 pe-1 fs-5'>
        {props.type==='text'?
           <Card.Body>
             <Card.Text>
               {props.data}
             </Card.Text>
            </Card.Body>
          :
            <>
              <Card.Body>
                <img alt='document' style={{maxHeight:'256px',maxWidth:'864px'}} src={props.data}></img>
              </Card.Body>
              <Card.Footer className='d-flex justify-content-end'>
                <a href={props.data} className='btn' target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                  </svg>
                </a>
              </Card.Footer>
            </>
        }
      </Card>
    </div>
  );
}

export default Message;
