const router = require("express").Router();
const User = require("../Model/registration");
const Employee = require("../Model/Employee");

router.route("/check/:username").get(async (req,res) =>{
    const username = req.params.username;
  
    await User.exists({ userName : username }).then((data) =>{
        if(data !==null) {
            res.json(true);
        }
        else{
            res.json(false);
        }
        console.log(data);
    }).catch((err) =>{
        console.log(err);
    });
});

router.route("/get/:username").get(async (req,res) =>{

    const username = req.params.username;

    User.findOne({ username }).then((data) =>{
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/getAll").get(async (req,res) =>{
    User.find().then((data) =>{
        res.json(data);
        res.status(200);
    }).catch((err) =>{
        console.log(err);
        res.status(400);
    })
})

module.exports = router;