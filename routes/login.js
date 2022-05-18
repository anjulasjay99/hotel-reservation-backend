const router = require("express").Router();
const User = require("../Model/registration");
const Employee = require("../Model/Employee");

const Admin = {
    username : "admin1",
    password : "ad123"
}

//Check traveller username
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

// Check Employee Username 

router.route("/checkEmp/:username").get(async (req,res) =>{
    const username = req.params.username;
  
    await Employee.exists({ email : username }).then((data) =>{
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

// Return traveller information
router.route("/get/:username").get(async (req,res) =>{

    const username = req.params.username;

    await User.find({ userName : username }).then((data) =>{
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

// Return employee information

router.route("/getEmp/:username").get(async (req,res) =>{

    const username = req.params.username;

    await Employee.find({ email : username }).then((data) =>{
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/getAll").get(async (req,res) =>{
    await User.find().then((data) =>{
        res.json(data);
        res.status(200);
    }).catch((err) =>{
        console.log(err);
        res.status(400);
    })
})

// Check admin username

router.route("/getAdmin/:username").get( (req,res) =>{
    const username = req.params.username;
    if(Admin.username == username) {
        res.send(true);

    }
    else{
        res.send(false);
    }
});

// Get admin info

router.route("/getAdmin").get( (req,res) =>{
    res.json(Admin);
});


module.exports = router;