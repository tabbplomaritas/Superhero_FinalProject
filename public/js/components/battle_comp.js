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
          <h2>{{$ctrl.opponent.name}}</h2>
              <img class="fighter_info_img" ng-model="$ctrl.opponent.image.url" src="{{$ctrl.opponent.image.url}}">
              <div class="speechBubble">
                  <p class="speechBubble_questions">{{$ctrl.questions[$ctrl.qIndex].question}}<span>|</span></p>
                 
                  <img src="/assets/design/speechBubble_wide.png">
              </div>
          </div>

          <div class="begin_battle_button_wrap">
            <button class="button_battle animated pulse infinite" ng-show="$ctrl.showMe" ng-click="$ctrl.startBattle();">Click to begin battle!</button>
          </div>


         
          <div class="fighter_info">
          <h2>{{$ctrl.clickedHero.name}}</h2>
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
      
</section>
`,

controller: ["GameService", function (GameService){
    const vm = this;

    // hero that user has chosen to play with
    let clickedHero = {};
    let winner = {};   

    // GamePlay declaration code
    vm.playerHealth = 2;
    vm.opponentHealth = 2;
    vm.qIndex = 0;
    vm.selectedAnswer;
    vm.questions=[];
    vm.totalWins = 0;
    vm.i = 0;
    vm.showMe = true;
    vm.opponent;

    vm.playerHealthBarWidth = 100;
    vm.oppHealthBarWidth = 100;

    //health bar to decrement with css
    const oppHealthBar = document.getElementById("oppHealthBar");
    const playerHealthBar = document.getElementById("playerHealthBar");
    
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
    const questionP = document.querySelector(".speechBubble_questions");
    vm.startBattle = () => {
    
        
    GameService.getQuestions(vm.i).then(()=>{
       
        console.log(questionP);
        //add the animated class to the speech bubble Q's </p>
        angular.element(questionP).addClass("anim-typewriter");
        vm.showMe= false;
        vm.questions=GameService.sendQuestions();
        })
    };


    vm.checkAnswer = (option) => {
        vm.selectedAnswer = option;
        vm.correctAnswer = vm.questions[vm.qIndex].answer;
    
        //remove question animation
        angular.element(questionP).removeClass("anim-typewriter");
        angular.element(questionP).css("display", "none");
    
        //checks the answer itself
        vm.isAnswerRight(vm.selectedAnswer, vm.correctAnswer);
        //then we check if there's a winner yet
        vm.checkForWinner();
        
    }

    vm.isAnswerRight = () => {
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
    }

    vm.checkForWinner = () => {
        if (vm.playerHealth > 0 && vm.opponentHealth > 0) {
           
            console.log(questionP);
            vm.qIndex++;
            angular.element(questionP).css("display", "block");
            angular.element(questionP).addClass("anim-typewriter");
        } else if (vm.playerHealth === 0){
            console.log("playerHealth 0");
            console.log(vm.opponent);
            
            // Send the opponent to the Gameover Screen
            GameService.sendWinner(vm.opponent);
            //end round, change to view to gameover view
        } else if (vm.opponentHealth === 0){
            console.log("playerHealth 0");
            vm.totalWins++;
            GameService.sendWinner(vm.clickedHero); 
            GameService.sendTotalWins(vm.totalWins);
            console.log(vm.totalWins);   
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
