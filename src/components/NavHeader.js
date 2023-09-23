import React, { useContext } from 'react'
import { UserContext } from "../context/UserContext";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavHeader() {
  const {senderPic} = useContext(UserContext);
  return (
    <>
      <div className='nav-header bg-primary rounded-start'>
          <div className='profile-pic ms-2'>
              <img src={senderPic} alt='profile pic'/>
          </div>
      </div>

      <Navbar className="search-bar justify-content-center">
      <Form inline='true'>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="button">Search</Button>
          </Col>
        </Row>
      </Form>
      </Navbar>
    </>
  )
}

export default NavHeader
