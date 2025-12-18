const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  class: String,
  address: String,
  town: String,
  partnerName: String,
  fatherName: String,
  motherName: String,
  college: String,
  school: String
});

module.exports = mongoose.model("Student", studentSchema);
