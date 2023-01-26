const mongoose = require("mongoose");

// Shemas are the structure of our data, and the data types

const fruitSchema = new mongoose.Schema({
  name: String,
  color: String,
  age: Number,
  readyToEat: Boolean,
});

const myfruits = mongoose.model("myfruits", fruitSchema);

module.exports = myfruits;
