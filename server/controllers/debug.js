const clientio = require("socket.io-client");

const config = require("../../shared/config");
const events = require("../../shared/events");

module.exports.debugMachineSlot = (req, res) => {
  const client = clientio.connect(
    `${config.URL_RASPBERRY}:${config.PORT_RASPBERRY}`
  );

  const { slot } = req.body;

  client.emit(events.DEBUG_SLOT, slot);

  client.disconnect();
};
