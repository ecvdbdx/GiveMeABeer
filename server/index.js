const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const events = require("../shared/events");
const config = require("../shared/config");

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

app.get("/", (req, res) => {
  res.send("Test");
});

app.post("/product", productsController.addProduct);
app.post("/order", productsController.addOrder);

const http = require("http").Server(app);

/* Socket.io bootstrap */

const io = require("socket.io")(http);

io.on("connection", socket => {
  console.log("a user connected");
});

/* app startup */

http.listen(config.API_PORT, () => {
  console.log(`Express running on port 8079`);
});
