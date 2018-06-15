"use strict";
console.log("character comp is working");

const character = {
  bindings: {
    charSelect: "&",
    charData: "<"
  },
  template:`
  <p>{{$ctrl.hero}}</p>
  <p>this is a character test</p>

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