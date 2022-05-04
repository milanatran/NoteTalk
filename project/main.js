"use strict";

const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const port = 3000,
express = require("express"),
app = express();
app.set("view engine", "ejs");

app.get("/chatroom/:url", homeController.sendReqParam);
app.get("/name/:myName",homeController.respondWithName);

app.use((req, res, next) => {
console.log(`request made to: ${req.url}`);
next();
});

app.use(
 express.urlencoded({
 extended: false
 })
);
app.use(express.json());
app.use(layouts);

//Get data being submitted
app.post("/", homeController.showData);
// app.post("/", (req, res) => {
//  console.log(req.body);
//  console.log(req.query);
//  res.send("POST Successful!");
// });

app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});
