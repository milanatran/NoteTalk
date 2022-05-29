const mongoose = require("mongoose"),
 signUpSchema = mongoose.Schema({
 username: {
   type:String,
   required:true,
   unique:true,},

 email: {
   type:String,
   required:true,
   lowercase: true,
   unique:true,
 },
 password: {
   type:String,
   required:true
 },
 chatrooms: [{type: mongoose.Schema.Types.ObjectId, ref: "Chatroom"}]
});

module.exports = mongoose.model("User", signUpSchema);

//TODO: think about removing the password, admins also shoouldnt know about it
signUpSchema.methods.getInfo = function() {
 return `Username: ${this.username} Email: ${this.email} Password: ${this.password}`;
};

signUpSchema.methods.findUser = function() {
 return this.model("User")
 .findOne({username: this.username})
 .exec();
};
