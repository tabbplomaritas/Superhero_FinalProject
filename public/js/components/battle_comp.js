"use strict";

const battle = {
template: `
<section class="main">
   
        <section class="healthBar_div">
            <div class="nameAndBar">
                <div class="health_bar_name"> {{ $ctrl.clickedHero.name }} Health </div>
                <div class="healthBar_outer">
                    <div id="playerHealthBar" class="healthBar_inner"></div>
                </div>
            </div>

                <p class="totalWins" ng-model="$ctrl.totalWins">
            Total Victories: {{$ctrl.victories}}</p>

            <div class="nameAndBar">
                <div class="health_bar_name"> {{ $ctrl.opponent.name }} Health</div> 
                <div class="healthBar_outer">
                    <div id="oppHealthBar" class="healthBar_inner"></div> 
                </div>
            </div>
        </section>

    
        <section class="fighters">

          <div class="fighter_info">
         
              <img class="fighter_info_img animated zoomIn" ng-model="$ctrl.opponent.image.url" src="{{$ctrl.opponent.image.url}}">
        <section class="name_bubbleWrap"> 
            <h2>{{$ctrl.opponent.name}}</h2>
            <div class="speechBubble">
                <p class="speechBubble_questions">{{$ctrl.questions[$ctrl.questionI].question}}</p>
                <img src="/assets/design/speechBubble_wide.png">
            </div>
          </div>

      
            <button class="button_battle animated pulse infinite" ng-show="$ctrl.showMe" ng-click="$ctrl.startBattle();">Click to begin battle!</button>
        


         
          <div class="fighter_info">
          
         
              <img class="fighter_info_img animated zoomIn" id="playerImg" ng-model="$ctrl.clickedHero.image.url" src="{{$ctrl.clickedHero.image.url}}">
        <section class="name_bubbleWrap"> 
            <h2>{{$ctrl.clickedHero.name}}</h2>
                <div class="speechBubble">
                    <div class="speechBubble_answers">
                    <div class="answer_options" ng-repeat="option in $ctrl.questions[$ctrl.questionI].options">
                        <p class="optionsTest" ng-click="$ctrl.checkAnswer(option);">{{option}} </p>
                    </div>
                    </div>
                    <img id="playerSpeech_flipped" src="/assets/design/speechBubble_wide.png">
                </div>
        </section>
    </section>
      
</section>
`,

controller: ["GameService", "$timeout", function (GameService, $timeout){
    const vm = this;

    // hero that user has chosen to play with
    let clickedHero = {};
    let winner = {};   

    // GamePlay declaration code
    vm.gradeI;
    vm.subjectI;
    vm.questionI = 0;
    vm.selectedAnswer;
    vm.questions=[];
    vm.totalWins = 0;
    vm.showMe = true;
    vm.opponent;
    vm.playerHealth = GameService.getPlayerHealth();
    vm.opponentHealth = GameService.getOpponentHealth();
    vm.rematchCount;
    vm.gamesPlayed;
  

    vm.playerHealthBarWidth = 100;
    vm.oppHealthBarWidth = 100;

    //sound effects
    const correctSound = document.getElementById("correct");
    const incorrectSound = document.getElementById("incorrect");
    const quizmusic= document.getElementById("quizmusic");
    //health bar to decrement with css
    const oppHealthBar = document.getElementById("oppHealthBar");
    const playerHealthBar = document.getElementById("playerHealthBar");
    const gameoversound = document.getElementById("gameover");

  
    
    //retrieves user info from service
    vm.user = GameService.getUserInfo();
    vm.isRematch = GameService.isRematch();

    vm.scrollWindow = () => {
        window.scrollTo(0, 212);
    };
    vm.scrollWindow();


    //based on users age range, sets the index for the array of questions
    vm.setGradeIndex = () => {
        
        if(vm.user.grade == 6){
            vm.gradeI = 0;
        } else if (vm.user.grade == 7){
            vm.gradeI = 1;
        } else if (vm.user.grade == 8){
            vm.gradeI = 2;
        };
    }

    vm.setSubjectIndex = () => {
      
        if(vm.user.subject === "English"){
            vm.subjectI = 0;
        } else if (vm.user.subject === "Math"){
            vm.subjectI = 1;
        } else if (vm.user.subject === "Science"){
            vm.subjectI = 2;
        } else if (vm.user.subject === "History"){
            vm.subjectI = 3;
        };
    }

    //calls the method above
    vm.setGradeIndex();
    vm.setSubjectIndex();
    

    if(vm.isRematch == false){
        GameService.setGradeSubject(vm.gradeI, vm.subjectI);
    } else {
        GameService.setPlayerHealth(vm.playerHealth);
        GameService.setOpponentHealth(vm.OpponentHealth);
    }


    vm.startBattle = () => {
        quizmusic.play();
        vm.questions = angular.copy(GameService.getQuestions());
        vm.showMe= false;
        vm.gamesPlayed = GameService.getGamesPlayed();
        vm.gamesPlayed++;
        GameService.sendGamesPlayed(vm.gamesPlayed);
    };

    vm.markCorrectAnswer = (option) => {
        let optionsTest = document.querySelectorAll(".optionsTest");
        vm.correctAnswer = vm.questions[vm.questionI].answer;
        let speechBubbleQuestion = document.querySelector(".speechBubble_questions");
        for(let i = 0; i < optionsTest.length; i++) {
            if(optionsTest[i].innerText === vm.correctAnswer){
                let correct = optionsTest[i];
                angular.element(correct).css("color", "green");
                angular.element(correct).addClass("customPulse");
            } else {
                let inCorrect = optionsTest[i];
                angular.element(inCorrect).css("color", "red");
            }
        }
    }

    vm.checkAnswer = (option) => {
        vm.selectedAnswer = option;
        vm.correctAnswer = vm.questions[vm.questionI].answer;
        
        //indicates the right and wrong answers via color change and animation.
        vm.markCorrectAnswer();
        //checks if users selection is the correct answer and deducts health as needed
        vm.isAnswerRight(vm.selectedAnswer, vm.correctAnswer);

        //after health deducted, checks if there is a winner yet or if a new question is given
        $timeout(() => {
            vm.checkForWinner();
        }, 1800);
    }

    vm.isAnswerRight = () => {
        if (vm.selectedAnswer == vm.correctAnswer){
                correct.play();
                //if it does, reduce opp health
                vm.opponentHealth --;
                //reduce the width of the bar variable by 20
                vm.oppHealthBarWidth -=25;
                //use that variable to adjust the width of the inner health bar
                angular.element(oppHealthBar).css("width", `${vm.oppHealthBarWidth}%`);

                //if the health reaches 1, change the bar to red
                if(vm.opponentHealth === 1){
                    angular.element(oppHealthBar).css("background-color", "red");
                }
                GameService.removeCorrectQuestion(vm.questionI);
        
        
            } else {
                incorrect.play();
                //if it is not correct, reduce player health
                vm.playerHealth --;
                vm.playerHealthBarWidth -=25;
                angular.element(playerHealthBar).css("width", `${vm.playerHealthBarWidth}%`);
                if(vm.playerHealth === 1){
                    angular.element(playerHealthBar).css("background-color", "red");
                }
            }
    }

    vm.checkForWinner = () => {

            if (vm.playerHealth > 0 && vm.opponentHealth > 0) {
                    vm.questionI++;
            } else if (vm.playerHealth === 0){
                    quizmusic.pause();
                    gameoversound.play();
                // Send the opponent to the Gameover Screen
                GameService.sendWinner(vm.opponent);
                //end round, change to view to gameover view
            } else if (vm.opponentHealth === 0){
                console.log("user wins");
                
                quizmusic.pause();
                gameoversound.play();
                vm.totalWins++;
                GameService.sendWinner(vm.clickedHero); 
                GameService.sendTotalWins(vm.totalWins);
                  
            }
      
    }
    //retrieving the user's character from Service
    vm.clickedHero = GameService.getHero();
    vm.victories = GameService.getTotalWins();

    //takes user back to home view/component
    vm.goToHome = () => {
        GameService.goToHome();
    };  
    
    vm.opponent = GameService.getOpponent();
    
         

     
   
}]
}


angular
    .module("app")
    .component("battle", battle);
