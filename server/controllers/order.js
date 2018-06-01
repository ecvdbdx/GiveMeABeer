const mongoose = require("mongoose");
const clientio = require('socket.io-client');
const Machine = mongoose.model("Machine");

const config = require("../../shared/config");
const events = require("../../shared/events");

module.exports.createOrder = async (req, res, next) => {
  const { id } = req.body;

  const machine = await Machine.findOne({}, {}, { sort: { 'created_at' : -1 } });
  let postition = null;
  machine.rows.forEach((row) => {
    row.slots.forEach((slot) => {
      console.log("1", slot)
      if (slot.productId === id) {
        console.log("2");
        position = (row.position - 1) * 8 + slot.position;
      }
    });
  });

  if (position) {
    const client = clientio.connect(
      `${config.URL_RASPBERRY}:${config.PORT_RASPBERRY}`
    );

    client.emit(events.ORDER_PLACED, { label: 'test', slot: position });
  }

  res.sendStatus(201);
};
