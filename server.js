console.log("STARTING SERVER...");
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`a user ${socket.id} connected`);

    socket.on("joinRoom", ({ roomCode, username }) => {
      console.log(`${username} joined room: ${roomCode}`);
      socket.join(roomCode);
      io.to(roomCode).emit("userJoined", { roomCode, username });
    });

    socket.on("sendMessage", ({ roomCode, username, message}) => {
      console.log(`${username} messaged room: ${roomCode}`);
      io.to(roomCode).emit("receiveMessage", {username, message});
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});