"use strict";
console.log("character comp is working");

const character = {

  template:`
  <button type="button" ng-click="$ctrl.getHeroes();">Get Heroes</button>
  <p>{{ $ctrl.hero }}</p>

  `,

  controller: ["GameService", function (GameService) {
    const vm = this;
    vm.hero = "";
    vm.getHeroes = () => {
      GameService.getPlayer().then((response) => {
        console.log(response);
        
    vm.hero = response.data.name;
      console.log(vm.hero);
    });
  }
}]

}

angular
  .module("app")
  .component("character", character);