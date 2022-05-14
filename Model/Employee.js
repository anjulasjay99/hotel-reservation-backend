const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeScheme = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  nic: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  telNo: {
    type: Number,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("employee", EmployeeScheme);
