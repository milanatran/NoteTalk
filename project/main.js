const homeController = require("./controllers/homeController");
const port = 3000,
 express = require("express"),
 app = express();

app.get("/chatroom/:url", homeController.sendReqParam);

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

app.post("/", homeController.showData);
// app.post("/", (req, res) => {
//  console.log(req.body);
//  console.log(req.query);
//  res.send("POST Successful!");
// });

app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});
