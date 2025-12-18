const express = require("express");
const mongoose = require("mongoose");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

/* ---------- MONGODB CONNECTION ---------- */
/*
👇👇👇
INGA UN MONGODB ATLAS LINK PODU
Database name = dataentry
*/
const uri =
    "mongodb+srv://logeshnnkavinn_db_user:Logeshnnkavinn7@cluster0.z9yk07k.mongodb.net/dataentry?appName=dataentry";

mongoose
    .connect(uri)
    .then(() => console.log("✅ MongoDB Connected (dataentry)"))
    .catch((err) => console.log("❌ Mongo Error:", err));

/* ---------- SCHEMA ---------- */
const studentSchema = new mongoose.Schema({
    name: String,
    class: String,
    address: String,
    town: String,
    partnerName: String,
    fatherName: String,
    motherName: String,
    college: String,
    school: String,
    date: { type: Date, default: Date.now },
});

/* ---------- MODEL ---------- */
const Student = mongoose.model("stud", studentSchema);

/* ---------- ROUTES ---------- */

// SAVE DATA
app.post("/submit", async (req, res) => {
    try {
        console.log("RECEIVED:", req.body);

        const student = new Student(req.body);
        await student.save();

        console.log("SAVED:", student);
        res.send("✅ Data saved in MongoDB");
    } catch (err) {
        console.log("SAVE ERROR:", err);
        res.status(500).send("❌ Error saving data");
    }
});

// VIEW DATA (CONFIRM)
app.get("/view", async (req, res) => {
    const data = await Student.find().sort({ date: -1 });
    res.json(data);
});

/* ---------- START SERVER ---------- */
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
