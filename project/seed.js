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
 password: 10016,
 chatrooms: []
 },
 {
 name: "Chef Eggplant",
 email: "eggplant@recipeapp.com",
 password: 20331,
 chatrooms:[]
 },
 {
 name: "Professor Souffle",
 email: "souffle@recipeapp.com",
 password: 19103,
 chatrooms:[]
 }
];

var testRoom;
var testUser;
var testRoom2;
var testUser2;
var commands = [];
console.log("start create");


async function deleteUsers(){
await User.deleteMany({})
 .exec()
 .then(() => {
 console.log("User data is empty!");
  });
}


async function deleteChatrooms(){
  await Chatroom.deleteMany({})
  .exec()
  .then(() => {
  console.log("Chatroom data is empty!");
})
.catch(error => {console.log(error)});
}

async function createChatrooms(){
  await Chatroom.create( {
 chatroomPath: "hqe373",
 title: "Tomato Land"
}).then(chatroom => {
  testRoom = chatroom;
  console.log(testRoom);

console.log("chatroom created");
})
.catch(error => {console.log(error)});
}

async function createUsers(){
  await contacts.forEach(async c => {
  await  createUser(c);
});
await console.log("user created");
}
//einzeln    node hat debug modus, den vielleicht nutzen
async function createUser(user){
  User.create({
 name: user.name,
 email: user.email,
 password: user.password,
 chatrooms:user.chatrooms
  })
}

async function addChatroomToUser(){
  await User.findOne({name: "Chef Eggplant"}).then(
   user => {
     testUser = user;
     console.log(user);
     testUser.chatrooms.push(testRoom);
     testUser.save().then(()=>{console.log("chatrooms connected");console.log(testUser);})
     .catch(error => {console.log(error)});

   }
 );}

 async function restDataBaseWithStandardData(){
  await deleteUsers();
  await deleteChatrooms();
  await createUsers();
  await createChatrooms();
  await addChatroomToUser();
 }



restDataBaseWithStandardData();









/*Chatroom.create( {
 chatroomPath: "khdgz37",
 title: "HTW Chatroom",
 chatrooms: []
}).then(chatroom => testRoom2 = chatroom);
User.findOne({name: "Jon Wexler"}).then(
 user => testUser2 = user
);
testUser2.chatrooms.push(testRoom2);
testUser2.save();
User.populate(testUser2, "chatrooms"); */
