const mongoose = require("mongoose");
const mongooseMongodbErrors = require("mongoose-mongodb-errors");

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const ProductSchema = new Schema({
  label: {
    type: String,
    trim: true,
    required: "Merci de renseigner un nom"
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    lowercase: true,
    trim: true
  },
  price: {
    type: Number,
    trim: true,
    required: "Merci de renseigner un prix"
  },
  allergies: {
    type: Array
  },
  categories: {
    type: Array
  }
});

ProductSchema.plugin(mongooseMongodbErrors);

module.exports = mongoose.model("Product", ProductSchema);
