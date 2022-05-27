const express = require("express");
const Model = require("../Model/registration")

const Router = express.Router()

//Register user
Router.route('/save').post(async(req,res) =>{
    
    let model = new Model(req.body);
    console.log(model)
    await model.save().then(model=>{
        res.status(200).json({'user':'new user added successfully'})
        console.log(model)
    }).
    catch((err)=>{
        console.log(model)
        res.status(400).send("user not added")
        console.log(err)
    })
})

//get all users
Router.route('/getAll').get((req,res)=>{
    Model.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
})


module.exports = Router;