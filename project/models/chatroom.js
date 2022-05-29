const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  chatroomPath:{
    type:String,
    required:true,
    unique: true
  },
  title :{
    type:String,
    required:true
  },
  users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
  //platz für beschreibung


});
module.exports = mongoose.model("Chatroom", chatroomSchema);
