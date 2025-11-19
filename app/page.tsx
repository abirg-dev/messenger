"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import JoinRoom from "./components/JoinRoom";
import ChatBox from "./components/ChatBox";

interface Message {
  isSystem: boolean;
  sender: string;
  content: string;
}

export default function Home() {
  const [roomCode, setRoomCode] = useState<string>("");
  const [thisuser, setThisuser] = useState<string>("");
  const [messages , setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("userJoined", function({ roomCode, username } : { roomCode: string; username: string }) {
      setMessages((prevMessages) => [...prevMessages, {isSystem: true, sender: username, content: "joined the room"}]);
    });
    socket.on("receiveMessage", function({ username, message } : { username: string; message: string }) {
      setMessages((prevMessages) => [...prevMessages, {isSystem: false, sender: username, content: message}]); 
    });

    return () => {
      socket.off("userJoined", function({ roomCode, username } : { roomCode: string; username: string }) {
        setMessages((prevMessages) => [...prevMessages, {isSystem: true, sender: username, content: "left the room"}]);
      });
      socket.off("receiveMessage");
    };
  }, []);
  
  function handleJoinRoom(roomCode : string, username : string) {
    setRoomCode(roomCode);
    setThisuser(username);
    socket.emit("joinRoom", {roomCode, username});
  }

  function handleSendMessage(message : string) {
    socket.emit("sendMessage", {roomCode, username: thisuser, message});
  }

  return (
    <div>
      { roomCode === "" && <JoinRoom handleJoinRoom={handleJoinRoom}/> }
      { roomCode !== "" && <ChatBox roomCode={roomCode} username={thisuser} messages={messages} handleSendMessage={handleSendMessage}/> }
    </div>
  );
}
