//Server side
module.exports = io => {
   io.on("connection", client => {
      // console.log("new connection");
     client.on('send-chat-message', message => {
       //Send the message to every client connected
       client.broadcast.emit('chat-message', message);
     });


     client.on("disconnect", () => {
       // console.log("user disconnected");
     });
     client.on("message", () => {
      io.emit("message", {
        content: "Hello"
      });
     });
   });
};
