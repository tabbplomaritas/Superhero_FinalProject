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
  let randomNum;
  let checkIsRematch = false;
  let playerHealth = 4;
  let opponentHealth = 4;
  let gamesPlayed = 0;
  let resetSvc;

  const resetService = () => {
    let player = 1; 
    let data = {};
    let clickedHero = {};
    let questionBank = [];
    let winner = {};
    let totalWins = 0;
    let opponent = false;
    let userInfo = {};
    let randomNum;
    let checkIsRematch = false;
    let playerHealth = 4;
    let opponentHealth = 4;
    let gamesPlayed = 0;
  }



  const isRematch = () => {
    return checkIsRematch;
  }

  const rematchTrue = () => {
    checkIsRematch = true;
  }

  const removeCorrectQuestion = (questionI) => {
    questionBank.splice(questionI, 1);
  }

  const getOpponent = () => {
    return opponent;
  }

  const upDifficulty = () => {
      if(userInfo.grade < 8){
      userInfo.grade++;
      }
  }

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

  const setOpponent = (id) => {
    
    return $http({
      method: "GET",
      url: "/home/" + id,
    }).then((response) => {
      opponent = response.data;
      // return opponent;
    }).catch((error) => {
      console.log(error);
    })
  };

  const setGradeSubject = (gradeI, subjectI) => {
     return $http({
      method: "GET",
      url: "/questions/",
    }).then((response) => {
      questionBank =response.data[gradeI][subjectI];      
    }).catch((error) => {
      console.log(error);
    })
  };

  const getQuestions = () =>{
    return questionBank;
  }
  const sendHero = (hero) => {
    clickedHero = hero;
  }

  const getHero = () => {
  return clickedHero;
  }

  const viewBattle = () => {    
    $location.path("/battle");
  }
  const goToStartGame = () => { 
    $location.path("/startgame");
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
  
    return totalWins
  }

  const getTotalWins = () => {
    return totalWins
  }
  
  const createRandomNum = () =>{
    let opponentSelect = [141, 207, 208, 225, 231, 247, 276, 287, 386, 398, 405, 441, 514, 558, 687]
    randomNum = opponentSelect[Math.floor(Math.random() * opponentSelect.length)];
  }

  const getRandomNum = () => {
    return randomNum
  }
  const sendGamesPlayed = (gameTotal) => {
    gamesPlayed = gameTotal;
    return gamesPlayed;
  }
  const getGamesPlayed = () => {
    return gamesPlayed;
  }

  const getPlayerHealth = () => {
    return playerHealth
  }
  const setPlayerHealth = (total) => {
    if (playerHealth === 1){
      return playerHealth;
    } else { playerHealth = total / 2 }
    return playerHealth;
  }

  const getOpponentHealth = () => {
    return opponentHealth
  }
  const setOpponentHealth = (total) => {
    if (opponentHealth === 1){
      return opponentHealth;
    } else {opponentHealth = total / 2;}
    return opponentHealth;
  }

  return {
    getPlayer,
    sendHero,
    getHero,
    viewBattle, 
    goToHome,
    setGradeSubject,
    getQuestions,
    sendWinner,
    getWinner,
    sendTotalWins,
    getTotalWins, 
    setOpponent,
    getOpponent,
    goToBattle,
    sendUserInfo,
    getUserInfo,
    createRandomNum,
    getRandomNum,
    upDifficulty,
    removeCorrectQuestion,
    isRematch, 
    rematchTrue,
    setPlayerHealth,
    getPlayerHealth,
    setOpponentHealth,
    getOpponentHealth,
    sendGamesPlayed,
    getGamesPlayed,
    goToStartGame,
    resetService
  };
}

angular 
  .module("app")
  .factory("GameService", GameService);