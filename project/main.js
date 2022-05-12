 "use strict";
 const MongoDB = require("mongodb").MongoClient,
  dbURL = "mongodb://localhost:27017",
  dbName = "NoteTalk_db";
 MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;
  let db = client.db(dbName);
   db.collection("contacts")
   .find()
   .toArray((error, data) => {
  if (error) throw error;
  console.log(data);
   });
 //   db.collection("contacts")
 // .insert({
 // name: "Freddie Mercury",
 // email: "fred@queen.com"
 // }, (error, db) => {
 // if (error) throw error;
 // console.log(db);
 // });
  });



const express = require("express"),
app = express();
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.set("port", process.env.PORT || 3000);
app.get("/", homeController.showHomePage);

app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get("port")}`
  );
});

app.get("/chatrooms", homeController.showOverview);
app.get("/contact", homeController.showSignIn);
app.post("/contact", homeController.postedSignUp);

// error handling
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
