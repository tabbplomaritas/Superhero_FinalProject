"use strict";

const express = require("express");
const homeRouter = express.Router();
let request = require('request');

homeRouter.get("/home/:id", (req, res) => {
  console.log(req.params.id);
    request(`http://superheroapi.com/api/834555310063588/${req.params.id}`, function (error, response, body) {
    console.log('error:', error); 
  // console.log('statusCode:', response && response.statusCode); 
  // console.log('body:', body);
  res.send(body);
  });

});

module.exports = homeRouter;