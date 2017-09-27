var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var MongoClient = require('mongodb').MongoClient;
var db;
db = MongoClient.connect('mongodb://localhost:27017/mattia')


var userSchema = new Schema({
    email : {type: String, required: true},
    password : {type : String, required: true}
});

userSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);