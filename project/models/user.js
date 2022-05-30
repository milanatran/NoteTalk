const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema(
   {
     name: {
       type:String,
     },

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

     chatrooms: [{type: mongoose.Schema.Types.ObjectId, ref: "Chatroom"}],
    },{
     timestamps: true
    }
);



//TODO: think about removing the password, admins also shoouldnt know about it
userSchema.methods.getInfo = function() {
 return `name: ${this.name} Email: ${this.email} Password: ${this.password}`;
};

userSchema.methods.findUser = function() {
 return this.model("User")
 .findOne({name: this.name})
 .exec();
};

module.exports = mongoose.model("User", userSchema);
