const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth = require("./routes/auth");
const quiz = require("./routes/quiz");
const ques = require("./routes/ques");
const cors=require("cors")

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/quizz", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (e) {
        console.error("DB Connection Error:", e);
        process.exit(1); // Exit process with failure
    }
};
app.use(cors());

connectDB();


// Middleware to parse JSON requests
app.use(express.json());

// Route handling
app.use("/api/v1/auth", auth);
app.use("/api/v1/quiz", quiz);
app.use("/api/v1/ques", ques);


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
