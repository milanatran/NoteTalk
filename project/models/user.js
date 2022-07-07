const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passportLocalMongoose = require("passport-local-mongoose");
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

     chatrooms: [{type: mongoose.Schema.Types.ObjectId, ref: "Chatroom"}],

     chatroomInvitations: [{type: mongoose.Schema.Types.ObjectId, ref: "Chatroom"}],

    },{
     timestamps: true
    }
);

userSchema.post("save", function(next){
  if( !this.chatrooms || this.chatrooms.length == 0 ){
    this.chatrooms=[];
  }
  if(!this.chatroomInvitations || this.chatroomInvitations.length == 0){
    this.chatroomInvitations=[];
  }
})


userSchema.plugin(passportLocalMongoose, {
 usernameField: "email"
});


userSchema.methods.getInfo = function() {
 return `name: ${this.name} Email: ${this.email}  `;
};

userSchema.methods.findUser = function() {
 return this.model("User")
 .findOne({name: this.name})
 .exec();
};
userSchema.methods.findUserByEmail = function() {
 return this.model("User")
 .findOne({email: this.email})
 .exec();
};
userSchema.methods.findById = function() {
 return this.model("User")
 .findOne({_id: this.id})
 .exec();
};

module.exports = mongoose.model("User", userSchema);
