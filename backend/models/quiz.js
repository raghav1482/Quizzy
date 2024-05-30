const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const quizSchema = new mongoose.Schema({
    title:{
        type:String
    },
    questions:[{
        type : mongoose.Types.ObjectId , 
        ref:"Ques"
    }],
    creator:{
        type:String,
        ref:"User"
    }
});

module.exports = mongoose.model("Quiz" , quizSchema);