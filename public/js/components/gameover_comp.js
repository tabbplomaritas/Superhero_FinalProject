//TODO:generates  the winner announcement 
// TODO: GET winner from battle comp
//TODO:create a button to to back to home screen

//TODO:reset power levels
"use strict";


const gameover = {

  template:`
  <section class="main_gameover">
      
      
      <div class="gameoverImgContainer">
        <h2 class="gameoverWinnerH2" ng-model="$ctrl.winner.name"> {{ $ctrl.winner.name }} </h2>
        <p class="gameoverWinner">WINNER!</p> 
      
        <img class="gameoverImg" ng-model="$ctrl.opponent.image.url" src="{{$ctrl.winner.image.url}}">
      </div>
      <div class="gamover_btns"> 
        <button class="button_home" ng-click="$ctrl.goToHome();">New Game</button>
        <button class="button_rematch animated pulse infinite" ng-click="$ctrl.goToBattle();">Rematch</button>
      </div>
    
    
  </section>
  `,

  controller: ["GameService", function (GameService) {
    const vm = this;
    // gets winner from battle comp
    vm.winner = GameService.getWinner();
    vm.clickedHero = GameService.retrieveHero();
    //TODO: change these to be consistant naming conventions -also change in other comps to reflect
   vm.opponent = GameService.returnOpponent();
  

    if(vm.winner.name == vm.clickedHero.name){
      GameService.upDifficulty();
      
    } 
    else if (vm.winner.name == vm.opponent.name) {
      console.log("opponent wins, play again with questions you got wrong");
      
    }


     vm.goToHome = () => {
        GameService.goToHome();
    };
    vm.goToBattle = () => {
      GameService.goToBattle();
    };  

   vm.user = GameService.getUserInfo();
   


  }]

}

angular
  .module("app")
  .component("gameover", gameover);