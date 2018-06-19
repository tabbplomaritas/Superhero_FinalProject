"use strict";


//generate an opponent with math.random 

//another api call to get that opponent with that number^

//generate questions

//if answer is correct or false, adjust power level

//TODO:repeat that until one is defeated

//TODO:change to the gamover over view/comp
//TODO:change h3 health level to powerbar
const battle = {
template: `
<section class="main">
        <p class="totalWins" ng-model="$ctrl.totalWins">
         Total Victories:{{$ctrl.victories}}

    </p>
    <section class="fighters">
        <div class="fighter_info">
            <h2>Player</h2>
            <h3 ng-model="$ctrl.playerHealth">{{$ctrl.playerHealth}}</h3>
            <p ng-model="$ctrl.clickedHero.name">{{ $ctrl.clickedHero.name }}</p>
            <img ng-model="$ctrl.clickedHero.image.url" src="{{$ctrl.clickedHero.image.url}}">
        </div>

        <div class="fighter_info">
            <h2>Opponent</h2>
            <h3 ng-model="$ctrl.opponentHealth">{{$ctrl.opponentHealth}}</h3>
            <p ng-model="$ctrl.opponent.name"> {{ $ctrl.opponent.name }} </p>
            <img ng-model="$ctrl.opponent.image.url" src="{{$ctrl.opponent.image.url}}">
        </div>

    </section>
    <button class="button_battle" ng-click="$ctrl.goToHome();">home</button>

    <div class="question">
        <h1>{{$ctrl.questions[$ctrl.qIndex].question}}</h1>

        
        <div ng-repeat="option in $ctrl.questions[$ctrl.qIndex].options">
        <p ng-click="$ctrl.checkAnswer(option);">
        {{option}}
        </p>
        </div>
    </div>
        <button class="button_battle" ng-click="$ctrl.startBattle();">Start Battle</button>
      
        <easy-questions></easy-questions>
</section>
`,

controller: ["GameService", function (GameService){
    const vm = this;

    // hero that player is using for the game
    let clickedHero = {};
    let opponentSelect = [141, 207, 208, 225, 231, 247, 276, 287, 386, 398, 405, 441, 514, 558, 576, 687]
    let randomNum = opponentSelect[Math.floor(Math.random() * opponentSelect.length)];

    let opponent = {}; 
    let winner = {};   

    // GamePlay declaration code
    vm.playerHealth = 1;
    vm.opponentHealth = 1;
    vm.qIndex = 0;
    vm.selectedAnswer;
    vm.questions=[];
    vm.totalWins = 0;
    
    //begins game: retrieve questions
    //TODO: triggers animations
    
    vm.startBattle = () =>{
    GameService.getQuestions().then(()=>{
        vm.questions=GameService.sendQuestions();
        })
    };


    vm.checkAnswer = (option) => {
        vm.selectedAnswer = option;
        vm.correctAnswer = vm.questions[vm.qIndex].answer;
  
        //check if selected answer equals correct ansswer
        if (vm.selectedAnswer == vm.correctAnswer){
            //if it does, reduce opp health
            vm.opponentHealth --;
        } else {
            //if it is not correct, reduce player health
            vm.playerHealth --;
            `player health is now: ${vm.playerHealth}`
        }
        vm.checkForWinner();
    }

    vm.checkForWinner = () => {
        if (vm.playerHealth > 0 && vm.opponentHealth > 0) {
            vm.qIndex++;
        } else if (vm.playerHealth == 0){
            // Send the opponent to the Gameover Screen
            GameService.sendWinner(vm.opponent);
            //end round, change to view to gameover view
        } else if (vm.opponentHealth == 0){
            // winner = vm.clickedHero;
            // console.log(winner);
            //  vm.sendWinner(winner);
            vm.totalWins++;
            GameService.sendWinner(vm.clickedHero); 
            GameService.sendTotalWins(vm.totalWins);
            //end round, change to view to gameover view
            //vm.gameOver;
            console.log(vm.totalWins);
            
        } else if (vm.opponentHealth == 0){
            // Send the selected hero to the Gameover Screen
            GameService.sendWinner(vm.clickedHero);          
        } 
    }
    //retrieving the user's character from Service
    vm.clickedHero = GameService.retrieveHero();

    vm.victories = GameService.getTotalWins();


    
    

    //takes user back to home view/component
    vm.goToHome = () => {
        GameService.goToHome();
    };  
    


    //gets opponent info from api using randomNum
    GameService.getOpponent(randomNum).then((response)=> {
    
        vm.opponent = response;
        
    });
}]

}

angular
   .module("app")
  .component("battle", battle);


  //change getPlayer to more generic title because it gets player OR opponent charecter. Suggest: get charecter

  //finish check answer method

  //write checkForWinner method 