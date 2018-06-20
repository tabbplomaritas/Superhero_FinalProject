"use strict";

function GameService ($http, $location) { 
  let player = 1; 
  let data = {};
  let clickedHero = {};
  let questionBank = [];
  let winner = {};
  let totalWins = 0;
  let opponent = false;
  let userInfo = {};
  let randomNum = {};


  const sendUserInfo = (user) => {
    userInfo = user;
    $location.path("/home");
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
  
  const createRandomNum = () =>{
    let opponentSelect = [141, 207, 208, 225, 231, 247, 276, 287, 386, 398, 405, 441, 514, 558, 576, 687]
    let randomNum = opponentSelect[Math.floor(Math.random() * opponentSelect.length)];
    console.log(randomNum);
    return randomNum
  }

  const getRandomNum = (randomNum) => {
    console.log("hi from getrandomnum service")
    return randomNum
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
    getUserInfo,
    createRandomNum,
    getRandomNum
  };
}

angular 
  .module("app")
  .factory("GameService", GameService);