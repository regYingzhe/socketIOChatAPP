const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require("http");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
  console.log("New User connected");
  // server emits the new email event
  socket.emit('newEmail', {
    from: "regi@gmail.com",
    text: 'Hello regi',
    createAt: 123
  });

  socket.emit("newMessage", {
    from: 'regi',
    text: 'shredded',
    createAt: 123
  })

  socket.on("disconnect", function() {
    console.log("client dropped")
  })

  socket.on("createEmail", function(newEmail) {
      console.log("createEmail", newEmail);
  })

  socket.on("createMessage", function(newMessage) {
    console.log("CreateMessage", newMessage);
    io.emit("newMessage", {
      from: newMessage.from,
      text: newMessage.text,
      createAt: new Date().getTime()
    })
  })
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
