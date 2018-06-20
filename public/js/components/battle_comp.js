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
        <p class="totalWins" ng-model="$ctrl.totalWins"
         Total Victories:{{$ctrl.victories}}</p>


        <div class="healthBar_div">
            <div class="healthBar_outer">
                <div class="healthBar_inner"></div>
            </div>
            <div class="healthBar_outer">
                <div class="healthBar_inner"></div>
            </div>
        </div>

    
        <section class="fighters">
        <h2>Opponent</h2>
        <div class="fighter_info">
            <img class="fighter_info_img" ng-model="$ctrl.opponent.image.url" src="{{$ctrl.opponent.image.url}}">
            <div class="speechBubble">
                <p id="opp_speech">Opponenet test test</p>
                <img src="/assets/design/speechBubble_wide.png">
            </div>
            
        </div>

        <h2>Player</h2>
        <div class="fighter_info">
            <img class="fighter_info_img" ng-model="$ctrl.clickedHero.image.url" src="{{$ctrl.clickedHero.image.url}}">
            
            <div class="speechBubble">
                <p id="player_speech">player test test</p>
                <img src="/assets/design/speechBubble_wide.png">
            </div>

        </div>
    </section>

    <div class="question">
        <h1>{{$ctrl.questions[$ctrl.qIndex].question}}</h1>

        <div ng-repeat="option in $ctrl.questions[$ctrl.qIndex].options">
            <p ng-click="$ctrl.checkAnswer(option);"> {{option}} </p>
        </div>
    </div>

    <button class="button_battle" ng-click="$ctrl.startBattle();">Start Battle</button>
      
</section>
`,

controller: ["GameService", function (GameService){
    const vm = this;

   

    let opponent = {}; 
    let winner = {};   

    // GamePlay declaration code
    vm.playerHealth = 1;
    vm.opponentHealth = 1;
    vm.qIndex = 0;
    vm.selectedAnswer;
    vm.questions=[];
    vm.totalWins = 0;
    vm.i = 0;
    
    //begins game: retrieve questions
    //TODO: triggers animations
    
    //retrieves user info from service
    vm.user = GameService.getUserInfo();
 
    //based on users age range, sets the index for the array of questions
    vm.setArrayIndex = () => {
        console.log(vm.user);
        if(vm.user.age == "8-10"){
            vm.i = 0;
        } else if (vm.user.age == "11-13"){
            vm.i = 1;
        } else if (vm.user.age == "14-16"){
            vm.i = 2;
        };
    }

    //calls the method above
    vm.setArrayIndex();

    vm.startBattle = () => {
    GameService.getQuestions(vm.i).then(()=>{
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
     // hero that player is using for the game
     let clickedHero = {};
    //  let opponentSelect = [141, 207, 208, 225, 231, 247, 276, 287, 386, 398, 405, 441, 514, 558, 576, 687]
    //  let randomNum = opponentSelect[Math.floor(Math.random() * opponentSelect.length)];
     
    let randomNum = {};
   

    // GameService.getRandomNum = (response) =>{
    //     randomNum = response;
    //     console.log(randomNum);
    // }
    vm.randomNum = GameService.getRandomNum();
    console.log(vm.randomNum);
     
    // GameService.getOpponent(vm.randomNum).then((response)=> {
    //     vm.opponent = response;
    // });
}]

}

angular
   .module("app")
  .component("battle", battle);


  //change getPlayer to more generic title because it gets player OR opponent charecter. Suggest: get charecter

  //finish check answer method

  //write checkForWinner method 