const mongoose = require("mongoose"),
 signUpSchema = mongoose.Schema({
 username: String,
 email: String,
 password: String
});
module.exports = mongoose.model("Users", signUpSchema);
