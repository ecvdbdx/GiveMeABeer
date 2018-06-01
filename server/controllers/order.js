const mongoose = require("mongoose");

const Machine = mongoose.model("Machine");

const config = require("../../shared/config");
const events = require("../../shared/events");

module.exports.createOrder = (req, res, next) => {
  const { id } = req.body;

  const machine = Machine.findOne({}, {}, { sort: { 'created_at' : -1 } });

  let postition = null;
  machine.rows.forEach((row) => {
    row.slots.forEach((slot) => {
      if (slot.productId === id) {
        position = row.position * slot.position;
      }
    });
  });

  if (postition) {
    const client = clientio.connect(
      `${config.URL_RASPBERRY}:${config.PORT_RASPBERRY}`
    );

    client.emit(events.DEBUG_SLOT, postition);
  }

  next();
};
