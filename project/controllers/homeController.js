exports.sendReqParam = (req, res) => {
 let chat = req.params.url;
 res.send(`This is the page for ${chat}`);
};

exports.respondWithName = (req, res) => {
 let paramsName = req.params.myName;
 res.render("index", { name: paramsName });
};

exports.showData = (req, res) => {
 console.log(req.body);
 console.log(req.query);
 res.send("POST Successful!");
};
