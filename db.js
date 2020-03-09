const mongooseCustomized = require("mongoose");
mongooseCustomized.Promise = global.Promise;
mongooseCustomized.connect("mongodb+srv://user_junior:gbc225@cluster0-c6ge2.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser : true})
.then((result)=>{console.log(result)})
.catch((err)=>{console.log(err)}); 

module.exports = mongooseCustomized;

//actual connection used for mongodb online..