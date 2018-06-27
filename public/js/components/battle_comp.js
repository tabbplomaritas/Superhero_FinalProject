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
                        <p ng-click="$ctrl.checkAnswer(option);">{{option}} </p>
                    </div>
                    </div>
                    <img id="playerSpeech_flipped" src="/assets/design/speechBubble_wide.png">
                </div>
        </section>
    </section>
      
</section>
`,

controller: ["GameService", function (GameService){
    const vm = this;

    let clickedHero = {};
    let winner = {};   

    vm.playerHealth = 7;
    vm.opponentHealth = 7;
    vm.gradeI;
    vm.subjectI;
    vm.questionI = 0;
    vm.selectedAnswer;
    vm.questions=[];
    vm.totalWins = 0;
    vm.showMe = true;
    vm.opponent;
  

    vm.playerHealthBarWidth = 100;
    vm.oppHealthBarWidth = 100;

    const oppHealthBar = document.getElementById("oppHealthBar");
    const playerHealthBar = document.getElementById("playerHealthBar");
    
    vm.user = GameService.getUserInfo();
    vm.isRematch = GameService.isRematch();

    vm.scrollWindow = () => {
        window.scrollTo(0, 212);
    };
    vm.scrollWindow();



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
        console.log(vm.subjectI);
    }

    vm.setGradeIndex();
    vm.setSubjectIndex();

    if(vm.isRematch == false){
        console.log(vm.isRematch);
        
        GameService.setGradeSubject(vm.gradeI, vm.subjectI);
    } else {
        console.log("this is a rematch, use old questions.");
        
    }

    vm.startBattle = () => {
    
        vm.questions = angular.copy(GameService.getQuestions());
        console.log(vm.questions);
        vm.showMe= false;
 
    };

    vm.checkAnswer = (option) => {
        vm.selectedAnswer = option;
        vm.correctAnswer = vm.questions[vm.questionI].answer;
    
       
    
        vm.isAnswerRight(vm.selectedAnswer, vm.correctAnswer);
        vm.checkForWinner();
        
    }

    vm.isAnswerRight = () => {
        if (vm.selectedAnswer == vm.correctAnswer){
                vm.opponentHealth --;
                vm.oppHealthBarWidth -=20;
                angular.element(oppHealthBar).css("width", `${vm.oppHealthBarWidth}%`);

                if(vm.opponentHealth === 1){
                    angular.element(oppHealthBar).css("background-color", "red");
                }

                console.log(`vm.questions[vm.gradeI][vm.subjectI]`);
                
                GameService.removeCorrectQuestion(vm.questionI);
                console.log(vm.questions);
                
        
            } else {
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
        
            vm.questionI++;

        } else if (vm.playerHealth === 0){
            console.log("playerHealth 0");
            console.log(vm.opponent);
            
            GameService.sendWinner(vm.opponent);
        } else if (vm.opponentHealth === 0){
            console.log("playerHealth 0");
            vm.totalWins++;
            GameService.sendWinner(vm.clickedHero); 
            GameService.sendTotalWins(vm.totalWins);
            console.log(vm.totalWins);   
        }
    }
    vm.clickedHero = GameService.getHero();

    vm.victories = GameService.getTotalWins();

    vm.goToHome = () => {
        GameService.goToHome();
    };  
    
    vm.opponent = GameService.getOpponent();
    console.log(vm.opponent);
    
    
         
}]
}


angular
    .module("app")
    .component("battle", battle);
