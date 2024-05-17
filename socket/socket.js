import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

export const app = express();
export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const currentUsers = {};

export const getRecievedSocketId = (recieverId) => {
  return currentlyOnlineUsers[recieverId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  currentUsers[userId] = socket.id;
  console.log("User connected", userId);
  io.emit("onlineUsers", Object.keys(currentUsers));

  socket.on("disconnect", () => {
    delete currentUsers[userId];
    console.log("User disconnected", userId);
    io.emit("onlineUsers", Object.keys(currentUsers));
  });
});
