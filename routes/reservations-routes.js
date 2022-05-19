const express = require("express");
const model = require("../Model/hotelreservations");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const Vonage = require("@vonage/server-sdk");

const Router = express.Router();

//email receipt template path
const template = path.join(
  __dirname,
  "../templates/email_receipt_template.html"
);

//setting up vonage account (to send sms)
const vonage = new Vonage({
  apiKey: "2db4b6d7",
  apiSecret: "SvtK3sckIcMrPoYx",
});

//setting up email account
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ezra.reinger78@ethereal.email",
    pass: "wR9gRHVFM9VMj5wAgz",
  },
});

//send SMS to customers
const sendSMS = (rsvData) => {
  const from = "Test Account";
  const to = rsvData.telNo;
  const text =
    "Your reservation has been confirmed! Visit http://localhost:3000 to view your reservation details. Thank you!";

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
};

//send email receipt to customers
const sendMail = (rsvData) => {
  let emailContent = "";
  fs.readFile(template, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      emailContent = data.toString();
      emailContent = emailContent
        .replace("$firtName", rsvData.firstName)
        .replace("$roomAndHotel", rsvData.room + ", " + rsvData.hotel)
        .replace("$fromDate", rsvData.checkInDate)
        .replace("$toDate", rsvData.checkOutDate)
        .replace("$nAdults", rsvData.noOfAdults)
        .replace("$nChildren", rsvData.noOfChildren)
        .replace("$amountPaid", "LKR " + rsvData.totalPayment)
        .replace("$datePaid", new Date())
        .replace("$reservationDate", new Date());

      var mail = {
        from: "<no-reply@testaccount.com>",
        to: rsvData.email,
        subject: "Wonder Lanka Tours",
        html: emailContent,
      };
      transporter.sendMail(mail, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent - " + info.response);
        }
      });
    }
  });
};

//add a reservations
Router.route("/save").post((req, res) => {
  let reservation = new model(req.body);
  reservation
    .save()
    .then(() => {
      sendMail(reservation);
      sendSMS(reservation);
      res
        .status(200)
        .json({ reservation: "new reservation added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Reservation not added");
      console.log(err);
    });
});



//get all reservations
Router.route('/getAll').get((req,res)=>{
  model.find((err,data)=>{
      if(err){
          console.log(err)
      }else{
          res.json(data)
      }
  })
})



//delete a reservation
Router.delete("/delete/:id", (req, res) => {
  model.findByIdAndRemove(req.params.id).exec((err, deletePost) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });

    return res.json({
      message: "Delete successful",
      deletePost,
    });
  });
});

Router.route("/getAll").get((req, res) => {
  model
    .find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(err));
});

//get all reservations made by a particular user
Router.route("/get/:username").get((req, res) => {
  const username = req.params.username;
  model
    .find({ userName: username })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error fetching data");
    });
});

Router.route("/get/:id").get((req, res) => {
  let id = req.params.id;
  model.findById(id, (err, model) => {
    res.json(model);
  });
});

//update a reservation

Router.route("/update/:id").post(function (req, res) {
  model.findById(req.params.id, function (err, model) {
    if (!model) res.status(404).send("reservation is not found");
    else model.firstName = req.body.firstName;
    model.lastName = req.body.lastName;
    model.email = req.body.email;
    model.telNo = req.body.telNo;
    model.country = req.body.country;
    model.lastName = req.body.lastName;
    model.checkInDate = req.body.checkInDate;
    model.checkOutDate = req.body.checkOutDate;
    model.noOfChildren = req.body.noOfChildren;
    model.noOfAdults = req.body.noOfAdults;
    model.room = req.body.room;
    model.hotel = req.body.hotel;
    model.totalPayment = req.body.totalPayment;
    model
      .save()
      .then((model) => {
        res.json("Reservation updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

module.exports = Router;
