import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI7lDeaIOFTyDaK2K0oVg96wCi0-9YaL8",
  authDomain: "web-chat-app-a23a3.firebaseapp.com",
  databaseURL: "https://web-chat-app-a23a3-default-rtdb.firebaseio.com",
  projectId: "web-chat-app-a23a3",
  storageBucket: "web-chat-app-a23a3.appspot.com",
  messagingSenderId: "80678112688",
  appId: "1:80678112688:web:dcc7edd24eee7690675a75"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();