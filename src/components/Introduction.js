import React from 'react'
import Card from 'react-bootstrap/Card';

function Introduction() {
  return (
    <Card border="info" className='bg-dark' style={{ width: '35%',height: '35%' }}>
        <Card.Body>
        <Card.Title className='text-primary fs-4'>Welcome to Web Chat App</Card.Title>
        <Card.Text className='text-light fs-4'>
            Click on any User to Continue/Start Conversation.
        </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Introduction