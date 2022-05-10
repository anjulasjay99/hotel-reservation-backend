const mongoose = require("mongoose");
const schema = mongoose.Schema

const HotelReservations = new schema({
 
    firstName : {
      type: String,
    },
    lastName: {
      type: String
    },
    email: {
        type: String
    },
    cellPhone:{
      type: String
    },
    country:{
      type:String
    },
    checkInDate:{
      type:String
    },
    checkoutdata:{
      type:String
    },
    numberOfChildren:{
      type:Number
    },
    numberOfAdult:{
      type:Number
    },
    totalPayment:{
      type:Number,

    }
})

module.exports = mongoose.model("reservations", HotelReservations)