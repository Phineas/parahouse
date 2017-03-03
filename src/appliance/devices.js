const Plug = require("./plug/plug.js");

var devices = {};

//Smart plugs
devices.plug_parallaxLights = new Plug({host: '192.168.0.22'});

//Hue Lights

module.exports = devices;
