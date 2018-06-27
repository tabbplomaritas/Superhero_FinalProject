//TODO:generates  the winner announcement 
// TODO: GET winner from battle comp
//TODO:create a button to to back to home screen

//TODO:reset power levels
"use strict";


const gameover = {

  template:`
  <section class="main">
      <div id="main_gameover">
      
        <div class="gameoverImgContainer">
          <h2 class="gameoverWinnerH2" ng-model="$ctrl.winner.name"> {{ $ctrl.winner.name }} </h2>
          <p class="gameoverWinner">WINNER!</p> 
        
          <img class="gameoverImg" ng-model="$ctrl.opponent.image.url" src="{{$ctrl.winner.image.url}}">
        </div>
        <div class="gamover_btns"> 
          <button class="button_new_game" ng-click="$ctrl.goToStartGame();">New Game <p class="gameoverButton_text">Journey back home and set out for a fresh battle!</p></button>
          
          <button class="button_rematch customPulse" ng-show="$ctrl.showMe" ng-click="$ctrl.goToBattle();">Rematch 
          <p class="gameoverButton_text">Face {{$ctrl.opponent.name}} once more, {{$ctrl.rematchPhrase}}</p></button>
        </div>
      </div>
    </div>
    
  </section>
  `,

  controller: ["GameService", function (GameService) {
    const vm = this;
    // gets winner from battle comp
    vm.winner = GameService.getWinner();
    vm.clickedHero = GameService.getHero();
    //TODO: change these to be consistant naming conventions -also change in other comps to reflect
   vm.opponent = GameService.getOpponent();
   vm.user = GameService.getUserInfo();
   vm.showMe = true;
    vm.rematchPhrase = "";
    console.log(vm.user);
  

    if(vm.winner.name == vm.clickedHero.name){
      GameService.upDifficulty();
      vm.rematchPhrase = `this time with harder ${vm.user.subject} questions!`;
      
    } 
    else if (vm.winner.name == vm.opponent.name) {
      vm.rematchPhrase = `this time with the ${vm.user.subject} questions you got wrong!`;

    }


     vm.goToStartGame = () => {
        GameService.goToStartGame();
        GameService.setOpponentHealth(4);
        GameService.setPlayerHealth(4);
    };
    
    vm.goToBattle = () => {
      GameService.rematchTrue();
      GameService.goToBattle();
    };  

   vm.user = GameService.getUserInfo();

   vm.gamesPlayed = GameService.getGamesPlayed();
   console.log(vm.gamesPlayed);
   if (vm.gamesPlayed === 2){
     vm.showMe = false;
     console.log(vm.showMe);
     GameService.createRandomNum(); 
     vm.randomNum = GameService.getRandomNum();
     GameService.setOpponent(vm.randomNum);
     GameService.sendGamesPlayed(0);
     GameService.setOpponentHealth(4);
     GameService.setPlayerHealth(4);
   }


  }]

}

angular
  .module("app")
  .component("gameover", gameover);