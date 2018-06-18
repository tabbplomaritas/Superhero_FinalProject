"use strict";
console.log("service is working");

function GameService ($http) { 
  let player = 1; 
  let data = {};
  let clickedHero = {};

  const getPlayer = (id) => {
    // console.log(id);
    // console.log(typeof id);
    // let newId = id.toString();
    // console.log(typeof newId);
    
    
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

  return {
    getPlayer,
    sendHero,
    retrieveHero
  };



}

angular 
  .module("app")
  .factory("GameService", GameService);