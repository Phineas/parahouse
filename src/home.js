const devices = require("./appliance/devices.js"),
      CronJob = require('cron').CronJob,
      hue = require("node-hue-api"),
      HueApi = hue.HueApi,
      hueConfig = require("../data/hue.json"),
      lightStates = require("./appliance/lighting/states"),
      NestApi = require("nest-api"),
      nestConfig = require("../data/nest.json");

console.log("Starting Parahouse...");

//Setup
let philipsHue = new HueApi(hueConfig.hostname, hueConfig.username),
    nest = new NestApi(nestConfig.email, nestConfig.password),
    lightIds = [1, 2];

updateAll(lightStates.starting);
devices.plug_parallaxLights.setPowerState(true);
updateTimedStates();

//Have to currently do it like this since groups aren't working :/
function updateAll(state) {
  lightIds.forEach((light) => {
    philipsHue.setLightState(light, state);
    console.log("Updated light " + light);
  });
}

//Light timings
function updateTimedStates() {
  var h = new Date().getHours();
  if(h > 17 && h < 24) {
    updateAll(lightStates.sunset);
  } else {
    updateAll(lightStates.day);
  }
}

var weekNightState = new CronJob({
  cronTime: '00 30 22 * * 1-4',
  onTick: function() {
    updateAll(lightStates.night);
    devices.plug_parallaxLights.setPowerState(false);
  },
  start: false,
  timeZone: 'Europe/London'
}).start();

var weekendNightState = new CronJob({
  cronTime: '00 59 23 * * 5-7',
  onTick: function() {
    updateAll(lightStates.night);
    devices.plug_parallaxLights.setPowerState(false);
  },
  start: false,
  timeZone: 'Europe/London'
}).start();
