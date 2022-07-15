

module.exports = {

  showHomePage: (req, res) =>  {
    res.render("index");
  },

  chat: (req, res) => {
    console.log("Trying to render chat.ejs...");
    res.render("chat");

  }
};
