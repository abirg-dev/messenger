'use client'

export default function ChatBox({roomCode, username, messages, handleSendMessage}) {
    function handleSubmit(event) {
        event.preventDefault();
        handleSendMessage(event.target.message.value);
        event.target.reset();
    }
  return (
    <div className="flex flex-col items-center justify-center">
        <h1>Room {roomCode}</h1>
        <div className="border rounded p-4 m-4 w-96 h-96 overflow-y-scroll">
            <p>Welcome, {username}!</p>
            <ul>
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        {msg}
                    </div>
                ))}
            </ul>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center justify-center">
            <input type="text" name="message" className="border rounded p-1 m-1" placeholder="Type a message..."/>
            <button type="submit" className="bg-green-500 hover:bg-green-800 rounded-xl text-white p-1 m-1 ">Send</button>
        </form>
    </div>
  );
}