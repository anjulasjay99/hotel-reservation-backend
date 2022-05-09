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
  checkoutdata: {
    type: String,
  },
  numberOfChildren: {
    type: Number,
  },
  numberOfAdult: {
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
