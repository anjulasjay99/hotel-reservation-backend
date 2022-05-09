const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const reservations = require("./routes/reservations-routes");
const paymentsRouter = require("./Routes/payments");

const app = express();
dotenv.config();

const PORT = process.env.port || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connection success!");
});
//
app.use("/reservation", reservations);

app.use("/payments", paymentsRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});
