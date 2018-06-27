"use strict";

const express = require("express");
const homeRouter = express.Router();
let request = require('request');
const questions = require('../data/quiz_questions_json');

homeRouter.get("/home/:id", (req, res) => {
  console.log(req.params.id);
    request(`http://superheroapi.com/api/834555310063588/${req.params.id}`, function (error, response, body) {
    console.log('error:', error); 

  res.send(body);
  });

});

homeRouter.get("/questions/",(req,res) =>{
  res.send(questions);
});



module.exports = homeRouter;


