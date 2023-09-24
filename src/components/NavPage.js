import React,{ useContext } from 'react'
import NavHeader from './NavHeader';
import UserNav from './UserNav';
import {UserContext} from "../context/UserContext";

const NavPage = ({ isMobile }) => {

    const { receiverId } = useContext(UserContext);

  return (
    <>
        { ( !isMobile || (isMobile && !receiverId) ) ?
            <div className='nav-page'>
                <NavHeader/>
                <UserNav/>
            </div>
            :''
        }
    </>
  )
}

export default NavPage