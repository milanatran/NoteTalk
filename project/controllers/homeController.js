exports.showHomePage = (req, res) => {
  res.render("index");
}

exports.showSignUp = (req, res) => {
  res.render("signUp");
}

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
