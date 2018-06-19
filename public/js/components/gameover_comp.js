//TODO:generates  the winner announcement 
// TODO: GET winner from battle comp
//TODO:create a button to to back to home screen

//TODO:reset power levels
"use strict";
console.log("gameover comp is working");

const gameover = {

  template:`
  <section class="main">
    <div class="fighter_info">
      <h1>Winner!</h1>
      <h2 ng-model="$ctrl.winner.name"> {{ $ctrl.winner.name }} </h2>
      <img ng-model="$ctrl.opponent.image.url" src="{{$ctrl.winner.image.url}}">
      <button class="button_battle" ng-click="$ctrl.goToHome();">home</button>
    </div>
  </section>
  `,

  controller: ["GameService", function (GameService) {
    const vm = this;
    // gets winner from battle comp
    vm.winner = GameService.getWinner();
     vm.goToHome = () => {
        GameService.goToHome();
    };  
  }]

}

angular
  .module("app")
  .component("gameover", gameover);