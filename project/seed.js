const mongoose = require("mongoose"),
 User = require("./models/User");
 mongoose.connect(
 "mongodb://localhost:27017/recipe_db",
 { useNewUrlParser: true }
);
mongoose.connection;
var contacts = [
 {
 username: "Jon Wexler",
 email: "jon@jonwexler.com",
 password: 10016
 },
 {
 username: "Chef Eggplant",
 email: "eggplant@recipeapp.com",
 password: 20331
 },
 {
 username: "Professor Souffle",
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
username: c.username,
email: c.email
 }));
});
Promise.all(commands)
 .then(r => {
 console.log(JSON.stringify(r));
 mongoose.connection.close();
 })
 .catch(error => {
   console.log(`ERROR: ${error}`);
 });
