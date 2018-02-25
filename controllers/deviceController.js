var express = require('express');
var deviceController = express.Router();

let data = {
  devices: [
    {id: 0, name: "Microscope", rentStatus: true},
    {id: 1, name: "Laptop", rentStatus: true},
    {id: 2, name: "Tape Measure", rentStatus: false}
  ]
}

function findDeviceByID(id){
  for (var i = 0; i < data.devices.length; i++){
    if (data.devices[i].id == id){
      return data.devices[i];
    }
  }
  return null;
}

function findDeviceByName(name){
  for (var i = 0; i < data.devices.length; i++){
    if (data.devices[i].name.toLowerCase() == name.toLowerCase()){
      return data.devices[i];
    }
  }
  return null;
}

//Returns all devices
deviceController.get('/', function (req, res){
  res.json(data.devices);
});

//Returns the device with of the requested id
deviceController.get('/find/:id', function(req, res){
  let devData = findDeviceByID(req.params.id);
  if(devData){
    res.json(devData);
  }
  else{
    res.status(500).send("Cannot find device.");
  }
});

//Add new device
deviceController.post('/', function (req, res) {
  if(req.body && req.body.newName){
    newData = {name: req.body.newName, rentStatus: true}
    data.devices.push(newData);
    res.json(data.devices);
  }
  else {
    res.status(500).send("Missing parameters.");
  }
});


module.exports = deviceController;
