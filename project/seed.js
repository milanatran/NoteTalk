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
 password: 20331
 },
 {
 name: "Professor Souffle",
 email: "souffle@recipeapp.com",
 password: 19103
 }
];

var testRoom;
var testUser;
var testRoom2;
var testUser2;
var commands = [];
console.log("start create");

User.deleteMany()
 .exec()
 .then(() => {
 console.log("User data is empty!");

 Chatroom.deleteMany()
  .exec()
  .then(() => {
  console.log("Chatroom data is empty!");


Chatroom.create( {
 chatroomPath: "hqe373",
 title: "Tomato Land"
}).then(chatroom => {
  testRoom = chatroom;
  console.log(testRoom);

console.log("chatroom created");

  contacts.forEach((c) => {
   commands.push(User.create({
  name: c.name,
  email: c.email,
  password: c.password
   }));
  });
  console.log("user created")

  Promise.all(commands)
   .then(r => {
   console.log(JSON.stringify(r));
   User.findOne({name: "Jon Wexler"}).then(
    user => {
      testUser = user;
      testUser.chatrooms.push(testRoom);
      testUser.save().then(()=>{console.log("chatrooms connected");console.log(testUser);});

      //mongoose.connection.close();
    }
   );
   })
   .catch(error => {
     console.log(`ERROR: ${error}`);
   });
})
.catch(error => {console.log(error)});
});

});






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
