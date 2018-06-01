const mongoose = require("mongoose");

const Machine = mongoose.model("Machine");

module.exports.addMachine = (req, res, next) => {
  const { label, accessPoint, rows } = req.body;

  const newMachine = new Machine({
    label,
    accessPoint,
    rows
  });

  newMachine.save(err => console.log(err));
  next();
};
