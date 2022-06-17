const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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

userSchema.pre("save", function(next) {
 let user = this;
 bcrypt.hash(user.password, 10).then(hash => {
   user.password = hash;
   next();
 })
 .catch(error => {
    console.log(`Error in hashing password: ${error.message}`);
    next(error);
  });
});


userSchema.methods.passwordComparison = function(inputPassword){
 let user = this;
 return bcrypt.compare(inputPassword, user.password);
};



//TODO: think about removing the password, admins also shoouldnt know about it
userSchema.methods.getInfo = function() {
 return `name: ${this.name} Email: ${this.email} Password: ${this.password}`;
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
