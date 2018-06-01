const express = require("express");
const productsController = require("./controllers/products");

const app = express();

app.get("/", productsController.hello);

app.listen("8079");
