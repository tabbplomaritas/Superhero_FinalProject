"use strict";
console.log("character comp is working");

const character = {
  bindings: {
    clickedHero: "<"
  },
  template:`
  <p ng-model="$ctrl.clickedHero.name"></p>
  <p>this is a character test</p>

  `,

  controller: ["GameService", function (GameService) {
    const vm = this;
    console.log(vm.clickedHero);
    console.log(vm.viewHero);
    // GameService.retrieveHero();
    vm.clickedHero = GameService.retrieveHero();
  //   vm.hero = "";
  //   vm.getHeroes = () => {
  //     GameService.getPlayer().then((response) => {
  //       console.log(response);
        
  //   vm.hero = response.data.name;
  //     console.log(vm.hero);
  //   });
  // }
}]

}

angular
  .module("app")
  .component("character", character);