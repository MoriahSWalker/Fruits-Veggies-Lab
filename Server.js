const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const myfruits = require("./models/fruit.js");
const myveggie = require("./models/veggie.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

console.log(myfruits);

let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.vc6edgd.mongodb.net/FoodDatabase?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// before I can ask and send data into the collectiong, i need to create model

app.post("/create_fruit", async (req, res) => {
  const {
    nameString: name,
    colorString: color,
    ageNumber: age,
    readyBool: readyToEat,
  } = req.body;
  // console.log("uploading to database...");
  let returnedValue = await myfruits.create({
    name,
    color,
    age,
    readyToEat,
  });

  console.log(returnedValue);
  if (returnedValue) {
    console.log("upload complete");
  }

  res.send(returnedValue);
});

app.post("/update_fruit", async (req, res) => {
  console.log(req.body);
  let response = await myfruit.findByIdAndUpdate(
    req.body.id,
    { name: req.body.newName },
    { new: true }
  );
  console.log("response from collection", response);
  res.json(response);
});

app.delete("/delete_nameless_data", async (req, res) => {
  let response = await myfruit.deleteMany({ name: "" });
  console.log(response);
  res.send({ data: `deleted ${response.deletedCount} items.` });
});
app.get("/get_food_data", async (req, res) => {
  // get data from database
  let response = await myfruit.find({});
  console.log(response);
  // send it back to front end
  res.json(response);
});

// Veggie Route will add new veggie to database
app.post("/create_new_veggie", async (req, res) => {
  const {
    nameString: name,
    colorString: color,
    ageNumber: age,
    readyBool: readyToEat,
  } = req.body;

  let returnedVeggieValue = await myveggie.create({
    name,
    color,
    age,
    readyToEat,
  });
  res.send(returnedVeggieValue);
});

app.get("/get_data", (req, res) => {
  // Get data from MonogoDB,
  // res.json(data)
  res.setHeader("Content-Type", "application/json");

  console.log("request received at /get_data");

  console.log(process.env.MONGOPASSWORD);
  res.json({ data: "Response from server" });
});

// will get all veggie objects from database and rtrn to front end
app.get("/veggies", async (req, res) => {
  // get data from database
  let response = await myveggie.find({});
  console.log(response);
  // send data to front end
  res.json(response);
});

// will return specific veggie from database
app.get("/veggies/:veggieName", async (req, res) => {
  // get data from database
  let response = await myveggie.find({ name: req.params.veggieName });
  console.log(response);
  // send data to fron end
  res.json(response);
});

app.listen(3000, () => {
  console.log(`Server is Listening on 3000`);
});
