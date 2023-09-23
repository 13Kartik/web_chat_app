import './App.css';
import { useState } from "react";
import { Chat } from './components/ChatContainer';
import ChatFooter from './components/ChatFooter';
import ChatHeader from './components/ChatHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavHeader from './components/NavHeader';
import UserNav from './components/UserNav';
import StateProvider from './context/UserContext';
import { Auth } from './components/Auth';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <StateProvider>
      {isAuth ? 
            <div className="App-container bg-dark" style={{ height: window.innerHeight, width: window.innerWidth }}>
              <div className='nav-container'>
                  <NavHeader/>
                  <UserNav/>
              </div>
              <div className='chat-page'>
                  <ChatHeader/>
                  <Chat/>
                  <ChatFooter/>
              </div>
          </div>

      :<Auth setIsAuth={setIsAuth}/>}

    </StateProvider>
  );
}

export default App;
