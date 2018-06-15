"use strict";

const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/home", (req, res) => {
    let request = require('request');
    request('http://superheroapi.com/api/834555310063588/1', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  // res.send(body);
  });

});

module.exports = homeRouter;