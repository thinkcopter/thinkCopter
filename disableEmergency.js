var arDrone = require('ar-drone');
//var droneIP = '184.78.238.165';
var droneIP = '73.162.173.191';
var myDrone = arDrone.createClient(droneIP);
myDrone._udpNavdatasStream._ip = droneIP;
myDrone._udpControl._ip = droneIP;
console.log(myDrone);
myDrone.disableEmergency();
