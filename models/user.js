const mongoose = require("mongoose");
const uuidv1 = require('uuidv1')
const { createHmac } = await import('crypto');

//define Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, //when spacing in the name, it will be cut
    required: true
  },
  email: {
    type: String,
    trim: true, //when spacing in the name, it will be cut
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

//virtual field
userSchema.virtual("password")
 .set(function(password){
   // create temporary variable called _password
   this._password = password
   // generate a timestamp
   this.salt = uuidv1()
   // encrypt the password
   this.hashed_password = this.encryptPassword(password)
 })
 .get(function(){
   return this._password
 })


 //methods
 userSchema.methods = {
   encryptPassword: function(password){
     if(!password) return "";
     try {
        return createHmac('sha256', this.salt)
          .update(password)
          .digest('hex');
     } catch (err){
       return "";
     }
   }
 }

module.exports = mongoose.model("User", userSchema)