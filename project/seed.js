const mongoose = require("mongoose"),
 User = require("./models/user");
 mongoose.connect(
 "mongodb://localhost:27017/NoteTalk_db",
 { useNewUrlParser: true }
);
mongoose.connection;
const Chatroom = require("./models/chatroom");



var contacts = [
 {
 name: "Jon Wexler",
 email: "jon@jonwexler.com",
 password: 10016
 },
 {
 name: "Chef Eggplant",
 email: "eggplant@recipeapp.com",
 password: 20331
 },
 {
 name: "Professor Souffle",
 email: "souffle@recipeapp.com",
 password: 19103
 }
];
User.deleteMany()
 .exec()
 .then(() => {
 console.log("User data is empty!");
 });
var commands = [];
contacts.forEach((c) => {
 commands.push(User.create({
name: c.name,
email: c.email,
password: c.password
 }));
});
var testRoom;
var testUser;

Chatroom.create( {
 chatroomPath: "hqe373",
 title: "Tomato Land",
}).then(chatroom => testRoom = chatroom);
User.findOne({name: "Jon Wexler"}).then(
 user => testUser = user
);
testUser.chatrooms.push(testRoom);
testUser.save();
User.populate(testUser, "chatrooms");

Chatroom.create( {
 chatroomPath: "khdgz37",
 title: "HTW Chatroom",
}).then(chatroom => testRoom = chatroom);
User.findOne({name: "Jon Wexler"}).then(
 user => testUser = user
);
testUser.chatrooms.push(testRoom);
testUser.save();
User.populate(testUser, "chatrooms");

Promise.all(commands)
 .then(r => {
 console.log(JSON.stringify(r));
 mongoose.connection.close();
 })
 .catch(error => {
   console.log(`ERROR: ${error}`);
 });
