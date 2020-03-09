
const mongoose = require("../db");

const Schema = mongoose.Schema;

const User = new Schema({

"Sender" :String,
"Receiver": String,
"Message": String,
"Date" : String,
"Time" : String,
"roomname" : String
},{collection : "UserChatHistory"});

const UserModule = mongoose.model("UserChatHistory",User);

module.exports = UserModule