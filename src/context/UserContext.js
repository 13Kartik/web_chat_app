import { createContext, useState } from "react";

export const UserContext = createContext();

const StateProvider = ({children})=>{
    const [receiverId,setReceiverId] = useState('');
    const [receiverName,setReceiverName] = useState('');
    const [receiverPic,setReceiverPic] = useState('');
    const [senderId,setSenderId] = useState('');
    const [senderName,setSenderName] = useState('');
    const [senderPic,setSenderPic] = useState('');
    const [user_list,set_user_list] = useState([]);

    return(
        <UserContext.Provider value={{receiverId,setReceiverId,senderId,setSenderId,senderName,setSenderName,senderPic,setSenderPic,receiverName,setReceiverName,receiverPic,setReceiverPic,user_list,set_user_list}}>
            {children}
        </UserContext.Provider>
    )
}

export default StateProvider;