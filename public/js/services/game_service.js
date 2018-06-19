"use strict";
console.log("service is working");

function GameService ($http, $location) { 
  let player = 1; 
  let data = {};
  let clickedHero = {};
  let questionBank = [];
  let winner = {};

  const getPlayer = (id) => {
    
    return $http({
      method: "GET",
      url: "/home/" + id,
    }).then((response) => {
      clickedHero = response.data;
      console.log(response.data);
      return clickedHero;
    }).catch((error) => {
      console.log(error);
    })
  };

  const getQuestions = () => {
     return $http({
      method: "GET",
      url: "/questions/",
    }).then((response) => {
      console.log(response.data);
      questionBank =response.data;
    }).catch((error) => {
      console.log(error);
    })
  };

  const sendQuestions = () =>{
    return questionBank;
  }
  const sendHero = (hero) => {
    clickedHero = hero;
  }

  const retrieveHero = () => {
  return clickedHero;
  }

  const viewBattle = () => {
    console.log("service view battle working...ish");
    
    $location.path("/battle");
  }

  const goToHome = () => {
    console.log("go to home in service working");
    
    $location.path("/home");
  }

  const getWinner = (winner) =>{
    console.log(winner);
    return winner;
  }

  
  

  return {
    getPlayer,
    sendHero,
    retrieveHero,
    viewBattle, 
    goToHome,
    getQuestions,
    sendQuestions,
    getWinner
  };



}

angular 
  .module("app")
  .factory("GameService", GameService);