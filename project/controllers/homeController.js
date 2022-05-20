exports.showHomePage = (req, res) => {
  res.render("index");
}

<<<<<<< HEAD
=======


>>>>>>> 382bc47888b34d9f53b1652414e86d605e9257b6
exports.postedSignUp = (req, res) => {
  res.render("confirmMail");
}

var room = [
 {
 title: "Project NoteTalk"
 },
 {
 title: "IMI Spam"
 },
 {
 title: "Family Chat"
 }
];
exports.showOverview = (req, res) => {
 res.render("overview", {
 chatrooms: room
 });
};
