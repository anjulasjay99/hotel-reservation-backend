
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const travellerRegistration = new schema({

  fullName: {
    type: String,
  },
  userName: {
    type: String,
  },
  email :{
    type: String,
  },
  telNo: {
    type: Number,
  },
  country: {
    type: String,
  },
  NIC: {
    type: String,
  },
  Password: {
    type: String,
  },
  Address:{
    type: String,
  }
});

module.exports = mongoose.model("registration", travellerRegistration);