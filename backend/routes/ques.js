const router = require("express").Router();
const Ques = require("../models/question");

router.post("/addques", async (req, res) => {
    try {
        console.log(req.body);
        const que = req.body;
        const question = new Ques(que);
        await question.save().then((result)=>{res.send(result)});
        
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
        console.log(e)
    }
});

module.exports = router;
