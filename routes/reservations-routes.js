const express = require("express");
const model = require("../Model/hotelreservations")

const Router = express.Router()

//add a reservations
Router.route('/save').post((req,res) =>{
    let reservation = new model(req.body);
    reservation.save().then(reservation=>{
        res.status(200).json({'reservation':'new reservation added successfully'})
    }).
    catch((err)=>{
        res.status(400).send("Reservation not added")
        console.log(err)
    })
})

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

Router.route('/get/:id').get((req,res)=>{
    let id = req.params.id;
    model.findById(id,(err,model)=>{
        res.json(model)
    })
})

//update a reservation

Router.route('/update/:id').post(function(req, res) {
    model.findById(req.params.id, function(err, model) {
        if (!model)
            res.status(404).send("reservation is not found");
        else
            model.firstName = req.body.firstName;
            model.lastName = req.body.lastName;
            model.email = req.body.email;
            model.cellPhone = req.body.cellPhone;
            model.country = req.body.country;
            model.lastName = req.body.lastName;
            model.checkInDate = req.body.checkInDate;
            model.checkoutdata = req.body.checkoutdata;
            model.numberOfChildren = req.body.numberOfChildren;
            model.numberOfAdult = req.body.numberOfAdult;
            model.totalPayment = req.body.totalPayment;
            model.save().then(model=> {
                res.json('Reservation updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
  
//delete a reservation
Router.route("/delete/:id").delete(async (req, res) => {
    let id = req.params.id;
    console.log(id);
    await model.findOneAndDelete({ id })
      .then(() => {
        res.status(200).send({ status: "Reservation Deleted" });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Reservation cannot deleted", error: err.message });
      });
  });


module.exports = Router;