"use strict";
console.log("service is working");

function GameService ($http, $location) { 
  let player = 1; 
  let data = {};
  let clickedHero = {};
  let questionBank = [];
  let winner = {};
  let totalWins = 0;
  let opponent = {};
  let userInfo = {};

  const sendUserInfo = (user) => {
    userInfo = user;
    console.log(userInfo);
    
  }
  
  const getUserInfo = () => {
    return userInfo;
  }

  const getPlayer = (id) => {
    
    return $http({
      method: "GET",
      url: "/home/" + id,
    }).then((response) => {
      clickedHero = response.data;
      return clickedHero;
    }).catch((error) => {
      console.log(error);
    })
  };

  const getOpponent = (id) => {
    
    return $http({
      method: "GET",
      url: "/home/" + id,
    }).then((response) => {
      opponent = response.data;
      return opponent;
    }).catch((error) => {
      console.log(error);
    })
  };

  const getQuestions = (i) => {
     return $http({
      method: "GET",
      url: "/questions/",
    }).then((response) => {
      questionBank =response.data[i];
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
    $location.path("/home");
  }
  const goToBattle = () => {
    $location.path("/battle");
  };

  // returns us winner of game in gameover_comp
  const sendWinner = (theWinner) =>{
    winner = theWinner;
    //logs winner of game
    console.log(winner.name);
    $location.path("/gameover");
  }

  // returns us 
  const getWinner = () => {
    return winner;
  }

  const sendTotalWins = (wins) =>{
    totalWins += wins;
    console.log(totalWins);
    return totalWins
  }

  const getTotalWins = () => {
    return totalWins
  }

  return {
    getPlayer,
    sendHero,
    retrieveHero,
    viewBattle, 
    goToHome,
    getQuestions,
    sendQuestions,
    sendWinner,
    getWinner,
    sendTotalWins,
    getTotalWins, 
    getOpponent,
    goToBattle,
    sendUserInfo,
    getUserInfo
  };
}

angular 
  .module("app")
  .factory("GameService", GameService);