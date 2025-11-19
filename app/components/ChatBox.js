'use client'

export default function ChatBox({roomCode, username, messages, handleSendMessage}) {
    function handleSubmit(event) {
        event.preventDefault();
        handleSendMessage(event.target.message.value);
        event.target.reset();
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
                                <p className="self-end text-xs">{msg.isSystem ? `${msg.sender} ${msg.content}` : msg.sender}</p>
                                <p>{!msg.isSystem && msg.content}</p>
                            </li>
                        )}
                    )}
                </ul>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center justify-center w-full">
                <input type="text" name="message" className="border rounded p-1 m-1 w-3/4" placeholder="Type a message..."/>
                <button type="submit" className="bg-green-500 hover:bg-green-800 rounded-xl text-white p-1 m-1 w-1/4">Send</button>
            </form>
        </div>
    </div>
  );
}