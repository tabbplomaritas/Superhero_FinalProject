"use strict";
console.log("service is working");

function GameService ($http) { 
  let player = 1; 
  let data = {};


  const getPlayer = () => {
    
    return $http({
      method: "GET",
      url: "/home"
    });
  };

  // const sendPlayer = () => {
  //   return data;
  // }

  return {
    getPlayer
  };



}

angular 
  .module("app")
  .factory("GameService", GameService);