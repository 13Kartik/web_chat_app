import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import React,{ useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext.js";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import google_icon from '../icons/google.png'

export const Auth = ({ setIsAuth }) => {
  const {
    senderId,
    senderName,
    senderPic,
    setSenderId,
    setSenderName,
    setSenderPic,
  } = useContext(UserContext);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Setting Global variables
      setSenderId("id_" + result.user.email);
      setSenderName(result.user.displayName);
      setSenderPic(result.user.photoURL);

      // Setting in local storage
      localStorage.setItem("senderId", "id_" + result.user.email);
      localStorage.setItem("senderName", result.user.displayName);
      localStorage.setItem("senderPic", result.user.photoURL);

      // Creating user in database
      try {
        await setDoc(doc(db, "users", "id_" + result.user.email), {
          username: result.user.displayName,
          userPic: result.user.photoURL,
        });
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document:", error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
      setSenderId(localStorage.senderId);
      setSenderName(localStorage.senderName);
      setSenderPic(localStorage.senderPic);

      if(senderId && senderName && senderPic) setIsAuth(true);
  }, [senderId, senderName, senderPic]);

  if (!senderId || !senderName || !senderPic) {
    return (
      <>
        <div className="App-container bg-dark" style={{ height: window.innerHeight, width: window.innerWidth }}>
          <Card border="primary" className="bg-dark">
            <Card.Body>
              <Card.Title className='text-primary fs-4'>Sign In With Google To Continue</Card.Title>
              <div className="p-3 d-flex align-items-center justify-content-center">
                <Button variant="outline-info" className="d-flex align-items-center fs-3" onClick={signInWithGoogle}>
                  <img src={google_icon} height='32px' width='32px'></img>
                  <p className="text-center ms-2 mb-0">Login</p>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  } else {
    return null; // Render nothing when user data is available
  }
};
