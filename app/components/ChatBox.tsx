'use client'

import { useState } from "react";

export default function ChatBox({roomCode, username, messages, handleSendMessage} : {roomCode: string, username: string, messages: {isSystem: boolean, sender: string, content: string}[], handleSendMessage: (message: string) => void}) {
    const [content, setContent] = useState<string>("");
    function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
        setContent(event.currentTarget.value);
    }

    function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        handleSendMessage(content);
        setContent("");
    }
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="m-4">Room {roomCode}</h1>
        <div className="w-96 px-4 flex flex-col">
            <div className="border rounded w-full h-96 overflow-y-scroll">
                <ul className="flex flex-col">
                    {messages.map((msg, index) => {
                        const alignMessage = msg.isSystem ? "self-center" : (msg.sender === username ? "self-end" : "self-start");
                        return (
                            <li key={index} className={`${alignMessage} flex flex-col p-2 m-2 bg-blue-500 rounded-xl text-white`}>
                                <p className="text-xs">{msg.isSystem ? `${msg.sender} ${msg.content}` : msg.sender}</p>
                                <p>{!msg.isSystem && msg.content}</p>
                            </li>
                        )}
                    )}
                </ul>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center justify-center w-full">
                <input type="text" name="message" value={content} className="border rounded p-1 m-1 w-3/4" placeholder="Type a message..." onChange={handleChange} />
                <button type="submit" className="bg-green-500 hover:bg-green-800 rounded-xl text-white p-1 m-1 w-1/4">Send</button>
            </form>
        </div>
    </div>
  );
}