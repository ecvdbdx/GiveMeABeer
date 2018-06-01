const mongoose = require("mongoose");
const mongooseMongodbErrors = require("mongoose-mongodb-errors");

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const MachineSchema = new Schema({
  label: {
    type: String,
    trim: true,
    required: "Merci de renseigner un nom"
  },
  accessPoint: {
    type: String,
    trim: true,
    lowercase: true
  },
  rows: {
    type: Array
  },
});

MachineSchema.plugin(mongooseMongodbErrors);

module.exports = mongoose.model("Machine", MachineSchema);
