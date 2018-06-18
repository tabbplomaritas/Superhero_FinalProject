"use strict";
console.log("service is working");

function GameService ($http) { 
  let player = 1; 
  let data = {};
  let clickedHero = {};

  const getPlayer = () => {
    
    return $http({
      method: "GET",
      url: "/home"
    });
  };

  const sendHero = (hero) => {
    clickedHero = hero;
    // return hero;
  }

  const retrieveHero = () => {
    return clickedHero;
  }

  return {
    getPlayer,
    sendHero,
    retrieveHero
  };



}

angular 
  .module("app")
  .factory("GameService", GameService);