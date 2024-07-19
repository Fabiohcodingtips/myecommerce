const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    phone:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


const User = mongoose.model('User',userSchema);

module.exports = User;