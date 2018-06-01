const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/give-me-a-beer");
mongoose.connection.on("error", err => {
  console.log(err);
});

mongoose.Promise = global.Promise;

/* Use mongoose singleton to get models reference across the app */
require("./models/Product");

const productsController = require("./controllers/products");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.post("/add-product", productsController.addProduct);

app.listen("8079");
