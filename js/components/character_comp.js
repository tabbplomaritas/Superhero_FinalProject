"use strict";
console.log("character comp is working");

const character = {

  template:`
  <button type="button" ng-click="$ctrl.getHeroes();">Get Heroes</button>
  <p>workin'</p>
  `,

  controller: ["GameService", function (GameService) {
    const vm = this;
    vm.getHeroes = GameService.getPlayer().then((response) => {
    console.log(response);
  });
}]

}

angular
  .module("app")
  .component("character", character);