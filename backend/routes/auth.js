const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// sign up
router.post("/register", async (req, res) => {
    try {
        const { email, password,username,image } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword,displayName:username,image:image });
            await newUser.save();
            res.status(201).json({ message: "SignUp Successful" });
        }
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
        console.log(e)
    }
});

// sign in
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Please Sign Up" });
        } else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                res.status(200).json({ id: user.id, message: "Signin Successful" });
            } else {
                res.status(400).json({ message: "Password not correct" });
            }
        }
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
