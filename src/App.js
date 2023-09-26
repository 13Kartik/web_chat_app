import './App.css';
import { useState } from "react";
import NavPage from './components/NavPage';
import ChatPage from './components/ChatPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import StateProvider from './context/UserContext';
import { Auth } from './components/Auth';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const isMobile = window.innerWidth<601;
  return (
    <StateProvider>
      {isAuth ? 
            <div className="App-container bg-dark" style={{ height: window.innerHeight, width: window.innerWidth }}>
              <NavPage isMobile={isMobile}/>
              <ChatPage isMobile={isMobile}/>             
            </div>
      :<Auth setIsAuth={setIsAuth}/>}
    </StateProvider>
  );
}

export default App;