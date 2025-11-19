'use client'
import { useState } from "react";

export default function JoinRoom({ handleJoinRoom } : { handleJoinRoom: (roomCode: string, username: string) => void }) {
  const [roomCode, setRoomCode] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleJoinRoom(roomCode, username);
    setRoomCode("");
    setUsername("");
  }
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="m-4">Join Room</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            <div>
                <div className="flex justify-between items-center m-1">
                    <label htmlFor="roomCode">Room Code</label>
                    <input type="text" name="roomCode" className="border rounded p-1 m-1" onChange={e => setRoomCode(e.currentTarget.value)} />
                </div>
                <div className="flex justify-between items-center m-1">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className="border rounded p-1 m-1" onChange={e => setUsername(e.currentTarget.value)} />
                </div>
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-800 rounded-xl text-white p-1 m-1">Join</button>
        </form>
    </div>
  );
}