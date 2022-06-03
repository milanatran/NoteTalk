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
  showHomePage: (req, res) =>  {
    res.render("index");
  }
};
