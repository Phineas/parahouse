const lightState = require("node-hue-api").lightState;

var states = {};

states.starting = lightState.create().on().bri(50).rgb(127, 41, 41).shortAlert();
states.default = lightState.create().on().bri(230).rgb(128, 0, 128);
states.sunset = lightState.create().on().rgb(255, 82, 81).bri(230);
states.night = lightState.create().on().rgb(128, 0, 128).bri(30);

module.exports = states;
