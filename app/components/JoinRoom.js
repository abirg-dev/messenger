'use client'

export default function JoinRoom({ handleJoinRoom }) {
  function handleSubmit(event) {
    event.preventDefault();
    const roomCode = event.target.roomCode.value;
    const username = event.target.username.value;
    handleJoinRoom(roomCode, username);
    event.target.reset();
  }
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="m-4">Join Room</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            <div>
                <div className="flex justify-between items-center m-1">
                    <label htmlFor="roomCode">Room Code</label>
                    <input type="text" name="roomCode" className="border rounded p-1 m-1" />
                </div>
                <div className="flex justify-between items-center m-1">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className="border rounded p-1 m-1" />
                </div>
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-800 rounded-xl text-white p-1 m-1">Join</button>
        </form>
    </div>
  );
}