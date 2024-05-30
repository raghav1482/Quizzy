const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const quesSchema = new mongoose.Schema({
    question:{
        type : String , 
        requires : true
    },
    options : [{
        type : String,  
    }],
    ans:{
        type:String
    },
    creator:{
        type:String
    }
});


module.exports = mongoose.model("Ques" , quesSchema);