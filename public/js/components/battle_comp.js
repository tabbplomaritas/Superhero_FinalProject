"use strict";


//generate an opponent with math.random 

//another api call to get that opponent with that number^

//generate questions

//if answer is correct or false, adjust power level

//TODO:repeat that until one is defeated

//TODO:change to the gamover over view/comp
const battle = {
template: `
<section class="main">
    <section class="fighters">
        <div class="fighter_info">
            <h2>Player</h2>
            <p ng-model="$ctrl.clickedHero.name">{{ $ctrl.clickedHero.name }}</p>
            <img ng-model="$ctrl.clickedHero.image.url" src="{{$ctrl.clickedHero.image.url}}">
        </div>

        <div class="fighter_info">
            <h2>Opponent</h2>
            <p ng-model="$ctrl.opponent.name"> {{ $ctrl.opponent.name }} </p>
            <img ng-model="$ctrl.opponent.image.url" src="{{$ctrl.opponent.image.url}}">
        </div>

    </section>

    <button ng-click="$ctrl.goToHome();">home</button>

        <p>{{$ctrl.questions[0].question}}</p>
        <p> {{ $ctrl.questions[0].option_a}}</p>
        <p> {{ $ctrl.questions[0].option_b}}</p>
        <p> {{ $ctrl.questions[0].option_c}}</p>
        <p> {{ $ctrl.questions[0].option_d}}</p>
        <button>Submit</button>
         
        <li ng-repeat=option in $ctrl.questions[0].options</p>
        <input type="radio" name="answer" value="{{option}}">{{option}}
      
</section>
`,

controller: ["GameService", function (GameService){
    const vm = this;
    let clickedHero = {};
    //selects random number to use as opponent id for api call
    let randomNum = Math.floor(Math.random() * 750) + 1;
    

    let opponent = {};    
    let heroScore = 0;
    let opponentScore = 0;
    
    vm.questions =[
        { 
         question: "What is half of 50?",
        //  option_a : 10,
        //  option_b: 4,
        //  option_c :16,
        //  option_d :25,
        options: [10,4,16,25],
         answer:3
        },


        ]

    //retrieving the user's character from Service
    vm.clickedHero = GameService.retrieveHero();
    console.log(vm.clickedHero);

    //takes user back to home view/component
    vm.goToHome = () => {
        GameService.goToHome();
    };  
    
    //gets opponent info from api using randomNum
    GameService.getPlayer(randomNum).then((response)=> {
        console.log(response.powerstats.combat);
        
        if(response.powerstats.combat == null){
            console.log("combat was null");
            
            GameService.getPlayer(randomNum);
        }else {
        vm.opponent = response;
        }
    });
  
   

}]




}

angular
   .module("app")
  .component("battle", battle);