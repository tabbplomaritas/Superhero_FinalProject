"use strict";

//generate an opponent with math.random 

//another api call to get that opponent with that number^

//TODO:generate questions

//TODO:if answer is correct or false, adjust power level

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

</section>
`,

controller: ["GameService", function (GameService){
    const vm = this;
    let clickedHero = {};
    //selects random number to use as opponent id for api call
    let randomNum = Math.floor(Math.random() * 750) + 1;
    

    let opponent = {};    

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