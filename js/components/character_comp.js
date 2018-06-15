"use strict";

const characterComp = {

  template: `
  
  `

}
controller: ["GameService", function (GameService) {
  const vm = this;
  characterList = MovieService.getPlayer();

}]


angular
  .module("app")
  .component("characterComp", characterComp);