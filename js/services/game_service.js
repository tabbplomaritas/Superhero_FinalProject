"use strict";

function GameService ($http, $location) {
  
  const vm = this; 
  let player = 1; 

  const getPlayer = (player) => {
    return $http({
      method: "GET",
      url: 'http://superheroapi.com/api/834555310063588/1'}).then((response) => {
        console.log(response);
        return response;
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