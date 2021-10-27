const path = require("path");

const app = require("express")();
const http = require("http");
const server = http.Server(app);
//const io = require("socket.io")(server);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});
//サーバーのポート
const port = process.env.port || 3000;

//httpのレスポンス
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

//WebSocket
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});

server.listen(port, () => {
  console.log(`start Server at port:${port}`);
});