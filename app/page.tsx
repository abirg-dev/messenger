"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import JoinRoom from "./components/JoinRoom";
import ChatBox from "./components/ChatBox";

export default function Home() {
  const [roomCode, setRoomCode] = useState("");
  const [thisuser, setThisuser] = useState("");
  const [messages , setMessages] = useState([]);

  useEffect(() => {
    socket.on("userJoined", function({ roomCode, username }) {
      setMessages((prevMessages) => [...prevMessages, {isSystem: true, sender: username, content: "joined the room"}]);
    });
    socket.on("receiveMessage", function({ username, message }) {
      setMessages((prevMessages) => [...prevMessages, {isSystem: false, sender: username, content: message}]); 
    });

    return () => {
      socket.off("userJoined", function({ roomCode, username }) {
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
