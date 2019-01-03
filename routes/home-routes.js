"use strict";

const express = require("express");
const homeRouter = express.Router();
let request = require('request');
const questions = require('../data/quiz_questions_json');

homeRouter.get("/home/:id", (req, res) => {
  request(`http://superheroapi.com/api/10104398116676278/${req.params.id}`, {rejectUnauthorized: false}, function (error, response, body) {
    console.log('error:', error); 
  
  res.send(body);
  });
});

homeRouter.get("/questions/",(req,res) =>{
  res.send(questions);
});



module.exports = homeRouter;


