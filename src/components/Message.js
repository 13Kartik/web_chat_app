import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { UserContext } from '../context/UserContext';

function Message({props}) {
  const { senderId } = useContext(UserContext);

  const isMe = (id) => {
    return id === senderId ? 'me' : 'not-me';
  }

  return (
    <div className={`d-flex ${isMe(props.sender)}`}>
      <Card bg='primary' text='light' className='message mb-2 ps-1 pe-1 fs-5'>
        {props.type==='text'?(
           <Card.Body>
             <Card.Text>
               {props.data}
             </Card.Text>
            </Card.Body>
          ):
            props.type==='img'?(
              <>
                <Card.Body>
                  <img alt='document' src={props.data}></img>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-end p-0'>
                  <a href={props.data} className='btn' target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg>
                  </a>
                </Card.Footer>
              </>
            ):
            <>
              <Card.Body style={{width:'280px'}} className='d-flex align-items-center'>
                <svg style={{width:'15%'}} xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-file-earmark-text text-dark" viewBox="0 0 16 16">
                  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                </svg>

                <div style={{width:'70%',overflowX:'hidden'}} className='fs-5'>{props.filename}</div>

                <a href={props.data} style={{width:'15%'}} className='btn p-0' target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                  </svg>
                </a>
              </Card.Body>
            </>
        }
      </Card>
    </div>
  );
}

export default Message;
