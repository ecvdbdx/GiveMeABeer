const mongoose = require("mongoose");
const clientio = require("socket.io-client");

const Product = mongoose.model("Product");
const config = require("../../shared/config");
const events = require("../../shared/events");

module.exports.addProduct = (req, res, next) => {
  const { label, description, image, price, allergies, categories } = req.body;

  const newProduct = new Product({
    label,
    description,
    image,
    price,
    allergies,
    categories
  });

  newProduct.save(err => console.log(err));
  next();
};

module.exports.addOrder = (req, res) => {
  const client = clientio.connect(
    `${config.URL_RASPBERRY}:${config.PORT_RASPBERRY}`
  );

  const { slot } = req.body;

  client.emit(events.ORDER_PLACED, {
    label: "TEST",
    slot
  });
};

module.exports.getProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};

module.exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
};
