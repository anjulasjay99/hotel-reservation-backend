const router = require("express").Router();
const Employee = require("../Model/Employee");

/*fetch details of all employees */
router.route("/").get((req, res) => {
  Employee.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error when fecthing data!");
    });
});

/*fetch details of one employee */
router.route("/:id").get((req, res) => {
  const id = req.params.id;

  Employee.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error when fecthing data!");
    });
});

/*add a new employee to db */
router.route("/").post(async (req, res) => {
  const employee = new Employee(req.body);

  await employee
    .save()
    .then(() => {
      res.status(200).json("Added Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Could not add data!");
    });
});

/*update details of an employee */
router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  const employee = new Employee(req.body);

  await Employee.findByIdAndUpdate(id, {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    telNo: employee.telNo,
    nic: employee.nic,
    address: employee.address,
  })
    .then(() => {
      res.status(200).json("Updated Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.json(400).json("Error when updating data!");
    });
});

/*remove an employee from the db */
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;

  await Employee.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json("Deleted successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error when deleting data!");
    });
});

module.exports = router;
