const mongoose = require("mongoose");

const Product = mongoose.model("Product");

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
