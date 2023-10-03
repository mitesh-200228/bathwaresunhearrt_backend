const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname : {type: String , require},
    lastname: {type:String,require},
    email : {type: String , require},
    number: {type:Number,require},
    typeIssue: {type:String,require},
    others:{type:String},
    comments:{type:String,require},
    bill:{type:String,require},
    country:{type:String,require},
    address:{type:String,require},
    city:{type:String,require},
    state:{type:String,require},
    pincode:{type:String,require},
    numberOfComplain: {type:Number,require},
    latitude:{type:Number,require},
    longitude:{type:Number,require}
} , {
    timestamps : true,
})

module.exports = mongoose.model('users' , userSchema)