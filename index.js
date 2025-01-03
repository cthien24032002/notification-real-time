const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();
app.use(cors());

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connection");
  //  chat
  socket.on("send_message_test", (data) => {
    io.emit("receive_message_test", data);
  });

  socket.on("send_message_test_fetch", (data) => {
    io.emit("receive_message_test_fetch", data);
  });

  //  vào room chat nào đó trong message
  socket.on("join_room_chat", (data) => {
    // thêm người dùng vào room
    socket.join(data.idTinNhan);
    console.log(`User ${data} joined room: ${room}`);
  });

  socket.on("send_message", (data) => {
    // gửi socket đến room chat
    io.to(data.id).emit("receive_message_room", data);
    // gửi thông báo tin nhắn
    io.emit("receive_message", data);
    console.log(data);
  });

  socket.on("disconnect_chat", () => {
    console.log("A user disconnected");
  });

  // share
  socket.on("noti_page_send", (data) => {
    io.emit("noti_page_recive", data);
  });
});

server.listen(1000, () => {
  console.log("Listening on *:1000");
});
