const express = require("express");
const model = require("../Model/registration")

const Router = express.Router()

//Register user
Router.route('/save').post((req,res) =>{
    let user = new model(req.body);
    user.save().then(user=>{
        res.status(200).json({'user':'new user added successfully'})
    }).
    catch((err)=>{
        res.status(400).send("user not added")
        console.log(err)
    })
})

//get all users
Router.route('/getAll').get((req,res)=>{
    model.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
})

module.exports = Router;