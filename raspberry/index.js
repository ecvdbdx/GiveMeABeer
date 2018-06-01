const express = require('express');
const rpio = require('rpio');
const clientio = require('socket.io-client');
const debug = require('debug')('give-me-a-beer');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const config = require('../shared/config');
const events = require('../shared/events');
const machine = require('../shared/machine-mapping');

// Creates Socket.io client to emit events to webserver
const client = clientio.connect(config.URL_API);

io.on(events.CONNECTION, (socket) => {
    debug('New client connected: %s', socket.handshake.address);

    socket.on(events.ORDER_PLACED, (product) => {
        debug('New product requested: %s', product);
        
        debug('Emit new event: %s', events.PROCESSING);
        client.emit(events.PROCESSING);

        if (machine[product]) {
            distributeProduct(product);
        } else {
            debug('Product not found: %s', product);

            debug('Emit new event: %s', events.PROCESSING_DONE);
            client.emit(events.PROCESSING_DONE);
        }
    });
});

function distributeProduct(product) {
    debug('Start distributing product: %s', product);

    rpio.open(machine[product].pin_line, rpio.OUTPUT, rpio.HIGH);
    rpio.open(machine[product].pin_row, rpio.OUTPUT, rpio.HIGH);
    rpio.write(machine[product].pin_line, rpio.LOW);
    rpio.write(machine[product].pin_row, rpio.LOW);
    rpio.sleep(machine[product].duration);
    rpio.write(machine[product].pin_line, rpio.HIGH);
    rpio.write(machine[product].pin_row, rpio.HIGH);

    debug('Finished distributing product: %s', product);

    debug('Emit new event: %s', events.PROCESSING_DONE);
    client.emit(events.PROCESSING_DONE);
}

http.listen(config.PORT_RASPBERRY, '0.0.0.0', () => {
    debug('Starting Raspberry server on port: %s', config.PORT_RASPBERRY);
});
