const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;


//import routes
const login = require("./routes/Users.routes");
const posts = require("./routes/Post.routes");
const Chat = require("./routes/Chat.routes");
const Notification =require('./routes/Notification.routes')


//use midllewars
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});



//use routes
app.use("/api/users",login);
app.use("/api/post",posts);
app.use("/api/chat",Chat);
app.use("/api/notification",Notification);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});

