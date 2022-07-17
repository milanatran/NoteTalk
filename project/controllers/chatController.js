const Message = require("../models/message");
module.exports = io => {
 io.on("connection", client => {
   client.on("disconnect", () => {
     client.broadcast.emit("user disconnected");
   });

   Message.find({})
   .sort({ createdAt: -1 })
   .limit(10)
   .then(messages => {
   client.emit("load all messages", messages.reverse());
   });

   client.on("message", (data) => {
    let messageAttributes = {
     content: data.content,
     userName: data.userName,
     user: data.userId
    },
    m = new Message(messageAttributes);
    m.save()
    .then(() => {
      console.log("saved");
      io.emit("message", messageAttributes);
    })
    .catch(error => console.log(`error: ${error.message}`));
  });
 });
};
