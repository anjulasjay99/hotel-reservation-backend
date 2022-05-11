const mongoose = require("mongoose");
const schema = mongoose.Schema;

const HotelReservations = new schema({
  
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  telNo: {
    type: String,
  },
  country: {
    type: String,
  },
  checkInDate: {
    type: String,
  },
  checkOutDate: {
    type: String,
  },
  noOfChildren: {
    type: Number,
  },
  noOfAdults: {
    type: Number,
  },
  room: {
    type: String,
  },
  hotel: {
    type: String,
  },
  totalPayment: {
    type: Number,
  },
});

module.exports = mongoose.model("reservations", HotelReservations);
