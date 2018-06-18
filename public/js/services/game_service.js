"use strict";
console.log("service is working");

function GameService ($http, $location) { 
  let player = 1; 
  let data = {};
  let clickedHero = {};
  let questionBank = [];

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

  const sendQuestions= (easyQuestions)  => {
    console.log(easyQuestions);
    
    questionBank = easyQuestions;
    
    console.log(questionBank);
    
  }

  const getQuestions = () => {
    console.log(questionBank);
    
    return questionBank;
  }
  

  return {
    getPlayer,
    sendHero,
    retrieveHero,
    viewBattle, 
    goToHome,
    sendQuestions,
    getQuestions
  };



}

angular 
  .module("app")
  .factory("GameService", GameService);