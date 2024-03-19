const mongoose  = require("mongoose");
const connDb = require("../config/db");

// userSchema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is must']
    },
    email:{
        type:String,
        required:[true,'email is must']
    },
    password:{
        type:String,
        required:[true,'password is must']
    },
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Blog'
        }
    ]
},{timestamps: true});

// model
const User = new mongoose.model("User",userSchema);

// exporting
module.exports = {User};