import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Message from "../components/Message";

export const BotChat = () => {
    const { chatBotMessages } = useContext(UserContext);

    return (
        <div className='chat-container' style={{ height: '80%' }}>
            {chatBotMessages.map((message, index) => (
                <Message key={index} data={message.data} type={message.type} sender={message.sender} />
            ))}
        </div>
    );
};
