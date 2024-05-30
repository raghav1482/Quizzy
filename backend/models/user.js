const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    displayName:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email uniqueness
        match: [/.+@.+\..+/, "Please enter a valid email address"] // Validate email format
    },
    password: {
        type: String,
        required: true
    },
    quizes: [{
        type: mongoose.Types.ObjectId,
        ref: "Quiz"
    }],
    image:{
        type:String
    }
});

// Middleware for bcrypt
userSchema.pre('save', async function(next) {
    if (this.isModified("password")) {
        const saltRounds = 12;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);
