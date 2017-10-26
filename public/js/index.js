var socket = io();
socket.on("connect", function() {
  console.log("Connected to Server");
  socket.emit("createEmail", {
    to: 'jen@gmail.com',
    text: 'Hello. This is Regi'
  })
  socket.emit("createMessage", {
    from: "regi",
    text: "stay shredded",
  })
});
socket.on("disconnect", function() {
  console.log("Disconnect from server")
})
//frontend receives the new email event
socket.on("newEmail", function(email) {
  console.log("New Email", email);
})

socket.on("newMessage", function(message) {
  console.log("Got New Message", message)
})
