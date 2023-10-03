const mongoose = require("mongoose");

var mongoDBURL = 'mongodb+srv://sunhearrtt:sunhearrt123@sunhearrt.fdkpy19.mongodb.net/'

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true});

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose