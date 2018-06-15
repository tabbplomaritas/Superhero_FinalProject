"use strict";
console.log("service is working");

function GameService ($http, $sce) { 
  let player = 1; 
  let data = {};


  const getPlayer = (player) => {
    return $http({
      method: "GET",
      url: 'http://superheroapi.com/api/834555310063588/1',
      
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
        console.log(response);
        let data = response;
        return data;
    });
  }

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