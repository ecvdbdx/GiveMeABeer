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
require("./models/Machine");

const productsController = require("./controllers/products");
const debugController = require("./controllers/debug");
const machinesController = require("./controllers/machines");
const orderController = require("./controllers/order");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Test");
});

app.post("/debug/slot", debugController.debugMachineSlot);

app.get("/products", productsController.getProducts);

app.get("/product/:id", productsController.getProduct);

app.post("/product", productsController.addProduct);

app.post("/machine", machinesController.addMachine);

app.post("/order", orderController.createOrder);

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
