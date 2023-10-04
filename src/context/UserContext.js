import { createContext, useState } from "react";

export const UserContext = createContext();

const StateProvider = ({children})=>{
    // const [theme,setTheme] = useState({primary:'',seconday:'',primary_bg:'',seconday_bg:''});
    const [receiverId,setReceiverId] = useState('');
    const [receiverName,setReceiverName] = useState('');
    const [receiverPic,setReceiverPic] = useState('');
    const [senderId,setSenderId] = useState('');
    const [senderName,setSenderName] = useState('');
    const [senderPic,setSenderPic] = useState('');
    const [active_room_id,set_active_room_id] = useState('');
    const [user_list,set_user_list] = useState([]);
    const [chat_rooms,set_chat_rooms] = useState([]);
    const [last_messages,set_last_messages] = useState([]);
    const [translate,setTranslate] = useState(false);
    const [isBot,setIsBot] = useState(false);
    const [chatBotMessages,setChatBotMessages] = useState(localStorage.chatBotMessages?JSON.parse(localStorage.chatBotMessages):[]);

    return(
        <UserContext.Provider value={{receiverId,setReceiverId,senderId,setSenderId,senderName,setSenderName,senderPic,setSenderPic,receiverName,setReceiverName,receiverPic,setReceiverPic,active_room_id,set_active_room_id,user_list,set_user_list,chat_rooms,set_chat_rooms,last_messages,set_last_messages,translate,setTranslate,isBot,setIsBot,chatBotMessages,setChatBotMessages}}>
            {children}
        </UserContext.Provider>
    )
}

export default StateProvider;