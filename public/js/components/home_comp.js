"use strict";

const home = {
     
    template: `
    <button type="button" ng-click="$ctrl.getHeroes(hero);">Get Heroes</button>
    <h1>this is test from home comp</h1>
    <character char-select="$ctrl.getHeroes(hero);"></character>
    `,
    controller: ["GameService", (GameService) => {
        const vm = this;
        // make a function that connects each 6 pre-set heroes to respective character info --> character comp
        vm.viewHero = (hero) => {
            GameService.getPlayer(hero).then((response)=>{
                vm.response = response;
                
                

          
          
            });
        }
            
        // 
    }]






}

angular
    .module("app")
    .component("home", home);