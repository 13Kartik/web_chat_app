import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext.js";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

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
    const getLocal = () => {
      setSenderId(localStorage.senderId);
      setSenderName(localStorage.senderName);
      setSenderPic(localStorage.senderPic);

      if (senderId && senderName && senderPic) {
        setIsAuth(true);
        return true;
      } else {
        return false;
      }
    };

    getLocal();
  }, [senderId, senderName, senderPic]);

  if (!senderId || !senderName || !senderPic) {
    return (
      <>
        <div>
          <p>Sign In With Google To Continue</p>
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
      </>
    );
  } else {
    return null; // Render nothing when user data is available
  }
};
