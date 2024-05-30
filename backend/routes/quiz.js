const router = require("express").Router();
const Quiz = require("../models/quiz");

router.post("/addquiz", async (req, res) => {
    try {
        const {title,questions,creator} = req.body;
        const quiz = new Quiz({title,questions,creator});
        await quiz.save().then((result)=>{res.send(result)});
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
