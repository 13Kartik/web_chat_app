import React, { useContext } from 'react'
import { UserContext } from "../context/UserContext";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NavHeader() {
  const {senderPic} = useContext(UserContext);
  return (
    <>
      <div className='nav-header bg-primary rounded-start'>
          <div className='profile-pic ms-2'>
              <img src={senderPic} alt='profile pic'/>
          </div>
      </div>

      <Navbar className="search-bar">
        <Form>
          <Form.Control
            type="text"
            placeholder="Search Users"
            className=" mr-sm-2"
            style={{width:'70%'}}
          />
          <Button type="button" style={{width:'25%'}}>Search</Button>
        </Form>
      </Navbar>
    </>
  )
}

export default NavHeader
