"use strict";

//TODO:add percentage decrement to health bar (here and in CSS)

//TODO:repeat that until one is defeated

//TODO:change to the gamover over view/comp

//TODO:change h3 health level to powerbar
const battle = {
template: `
<section class="main">
      
        <div class="healthBar_div">
            <div class="healthBar_outer">
                <div id="playerHealthBar" class="healthBar_inner"></div>
            </div>
            <p class="totalWins" ng-model="$ctrl.totalWins">
         Total Victories: {{$ctrl.victories}}</p>
            <div class="healthBar_outer">
                <div id="oppHealthBar" class="healthBar_inner"></div>
            </div>
        </div>

    
        <section class="fighters">

          <div class="fighter_info">
          <h2>Opponent</h2>
              <img class="fighter_info_img" ng-model="$ctrl.opponent.image.url" src="{{$ctrl.opponent.image.url}}">
              <div class="speechBubble">
                  <p class="speechBubble_questions anim-typewriter">{{$ctrl.questions[$ctrl.qIndex].question}}</p>
                 
                  <img src="/assets/design/speechBubble_wide.png">
              </div>
          </div>

          <button class="button_battle" ng-show="$ctrl.showMe" ng-click="$ctrl.startBattle();">Click to begin battle!</button>


         
          <div class="fighter_info">
          <h2>Player</h2>
              <img class="fighter_info_img" id="playerImg" ng-model="$ctrl.clickedHero.image.url" src="{{$ctrl.clickedHero.image.url}}">
              
              <div class="speechBubble">
                  <div class="speechBubble_answers">
                      <div class="answer_options" ng-repeat="option in $ctrl.questions[$ctrl.qIndex].options">
                        <p ng-click="$ctrl.checkAnswer(option);">
                            {{option}} 
                        </p>
                         
                      </div>
                  </div>
                  <img id="playerSpeech_flipped" src="/assets/design/speechBubble_wide.png">
              </div>
          </div>
    </section>

    <div class="question">
        <h1>{{$ctrl.questions[$ctrl.qIndex].question}}</h1>
        <div ng-repeat="option in $ctrl.questions[$ctrl.qIndex].options">
            <p ng-click="$ctrl.checkAnswer(option);"> {{option}} </p>
        </div>
    </div>
      
</section>
`,

controller: ["GameService", function (GameService){
    const vm = this;

    // hero that user has chosen to play with
    let clickedHero = {};
   
    let opponent = false; 
    let winner = {};   

    // GamePlay declaration code
    vm.playerHealth = 5;
    vm.opponentHealth = 5;
    vm.qIndex = 0;
    vm.selectedAnswer;
    vm.questions=[];
    vm.totalWins = 0;
    vm.i = 0;
    vm.showMe = true;

    vm.playerHealthBarWidth = 100;
    vm.oppHealthBarWidth = 100;
    
    //retrieves user info from service
    vm.user = GameService.getUserInfo();
  
    //based on users age range, sets the index for the array of questions
    vm.setArrayIndex = () => {
        console.log(vm.user);
        if(vm.user.grade == 6){
            vm.i = 0;
        } else if (vm.user.grade == 7){
            vm.i = 1;
        } else if (vm.user.grade == 8){
            vm.i = 2;
        };
    }

    //calls the method above
    vm.setArrayIndex();

    vm.startBattle = () => {
    
    GameService.getQuestions(vm.i).then(()=>{
        vm.showMe= false;
        vm.questions=GameService.sendQuestions();
        })
    };


    vm.checkAnswer = (option) => {
        vm.selectedAnswer = option;
        vm.correctAnswer = vm.questions[vm.qIndex].answer;
        console.log(option);
        console.log(vm.selectedAnswer);
        console.log(vm.correctAnswer);
        
        const oppHealthBar = document.getElementById("oppHealthBar");
        const playerHealthBar = document.getElementById("playerHealthBar");
        
  
        //check if selected answer equals correct ansswer
        if (vm.selectedAnswer == vm.correctAnswer){
            //if it does, reduce opp health
            vm.opponentHealth --;
            //reduce the width of the bar variable by 20
            vm.oppHealthBarWidth -=20;
            //use that variable to adjust the width of the inner health bar
            angular.element(oppHealthBar).css("width", `${vm.oppHealthBarWidth}%`);
            //if the health reaches 1, change the bar to red
            if(vm.opponentHealth === 1){
                angular.element(oppHealthBar).css("background-color", "red");
            }
        
        } else {
            //if it is not correct, reduce player health
            vm.playerHealth --;
            vm.playerHealthBarWidth -=20;
            
            angular.element(playerHealthBar).css("width", `${vm.playerHealthBarWidth}%`);
       
            if(vm.playerHealth === 1){
                angular.element(playerHealthBar).css("background-color", "red");
            }
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
            vm.totalWins++;
            GameService.sendWinner(vm.clickedHero); 
            GameService.sendTotalWins(vm.totalWins);
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
    
    vm.randomNum = GameService.getRandomNum();

    GameService.getOpponent(vm.randomNum).then((response)=> {
        vm.opponent = response;
    });
    
         

     
   
}]
}


angular
    .module("app")
    .component("battle", battle);
