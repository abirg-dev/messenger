"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import JoinRoom from "./components/JoinRoom";
import ChatBox from "./components/ChatBox";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [messages , setMessages] = useState([""]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("userJoined", function({ roomCode, username }) {
      setMessages((prevMessages) => [...prevMessages, `${username} joined`]);
    });
    socket.on("receiveMessage", function({ username, message }) {
      setMessages((prevMessages) => [...prevMessages, `${username}: ${message}`]); 
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  
  function handleJoinRoom(roomCode : string, username : string) {
    socket.emit("joinRoom", {roomCode, username});
    setRoomCode(roomCode);
    setUsername(username);
  }

  function handleSendMessage(message : string) {
    socket.emit("sendMessage", {roomCode, username, message});
  }

  return (
    <div>
      <p>Status: { isConnected ? "connected" : "disconnected" }</p>
      <p>Transport: { transport }</p>
      { roomCode === "" && <JoinRoom handleJoinRoom={handleJoinRoom}/> }
      { roomCode !== "" && <ChatBox roomCode={roomCode} username={username} messages={messages} handleSendMessage={handleSendMessage}/> }
    </div>
  );
}
