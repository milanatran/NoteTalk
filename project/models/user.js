const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passportLocalMongoose = require("passport-local-mongoose");
const randToken = require("rand-token");
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

     // apiToken: {
     //   type: String;
     // },

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
});


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
userSchema.pre("save", function(next) {
 let user = this;
 if (!user.apiToken) user.apiToken = randToken.generate(16);
 next();
});

module.exports = mongoose.model("User", userSchema);
