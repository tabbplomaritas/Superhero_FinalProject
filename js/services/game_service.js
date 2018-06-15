"use strict";

function GameService ($http, $location) { 
  let player = 1; 
  let data = {};

  const getPlayer = (player) => {
    return $http({
      method: "GET",
      url: 'http://superheroapi.com/api/834555310063588/1'}).then((response) => {
        console.log(response);
        let data = response;
    })
  }
  const sendPlayer = () =>{
  }

return {
  getPlayer
}

}

angular 
  .module("app")
  .factory("GameService", ["$http", GameService]);