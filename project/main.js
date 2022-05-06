"use strict";
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const port = 3000,
express = require("express"),
app = express();

//view engine setup
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.static("public"));


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

// get routes
app.get("/chatroom/:url", homeController.sendReqParam);
app.get("/name/:myName",homeController.respondWithName);

//Get data being submitted
// post routes
app.post("/", homeController.showData);

// error handling
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
app.use(errorController.logErrors);

app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});
