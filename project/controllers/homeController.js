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

module.exports = {
  showChatrooms: (req, res) => {
    res.render("overview", {chatrooms: room});
  },
  showHomePage: (req, res) =>  {
    res.render("index");
  }
};
