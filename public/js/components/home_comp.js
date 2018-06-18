"use strict";

const home = {
     
    template: `
    <section class="main">
        <h2>Choose your character!</h2>
        <section class="heroOption_container">
            <div ng-click="$ctrl.viewHero(hero);" ng-repeat="hero in $ctrl.heroes" class="heroOption">
            <p>{{ hero.name }}</p>
            <div class="img_wrapper">
                <img src="{{ hero.url }}">
            </div>
         </div>
        </section>
        
        <section>
            <p ng-model="$ctrl.clickedHero.name">{{ $ctrl.clickedHero.name }}</p>
        </section>
       
    </section>

    `,
    controller: ["GameService" , "$scope", function(GameService, $scope){
        const vm = this;
        vm.heroes = [
            {
            'name': "Captain America",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg',
            'id': 1
            }, 
            {
            'name': "Wonder Woman",
            'url': '/assets/images/wonderwoman.jpg'
            },  
            {
            'name': "Batman",
            'url': ''
            }
            , 
            {
            'name': "The Incredible Hulk",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/83.jpg'
            }, 
            {
            'name': "Spider Man",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg'
            }, 
            {
            'name': "Storm",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/135.jpg'
            }
            ]
        // make a function that connects each 6 pre-set heroes to respective character info --> character comp
        vm.hero = {};
        vm.viewHero = (hero) => {
            // console.log(hero);
            GameService.sendHero(hero);
            vm.clickedHero = GameService.retrieveHero();
            console.log(vm.clickedHero);
        };
    }]






}

angular
    .module("app")
    .component("home", home);