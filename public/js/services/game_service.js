"use strict";
console.log("service is working");

function GameService ($http, $location) { 
  let player = 1; 
  let data = {};
  let clickedHero = {};

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

  

  return {
    getPlayer,
    sendHero,
    retrieveHero,
    viewBattle
  };



}

angular 
  .module("app")
  .factory("GameService", GameService);