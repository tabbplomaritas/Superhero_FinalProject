"use strict";

//TODO:make buttons/methods that allow user to say okay or go back for character 

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
            <img ng-model="$ctrl.clickedHero.image.url" src="{{$ctrl.clickedHero.image.url}}">
            <h2>Hero Power stats:</h2>
          
            <p>Intelligence: </p>
            <p>{{ $ctrl.clickedHero.powerstats.intelligence }} </p>
            <p>Strength: </p>
            <p>{{ $ctrl.clickedHero.powerstats.strength }} </p>
            <p>Speed: </p>
            <p>{{ $ctrl.clickedHero.powerstats.speed }} </p>
            <p>Durability: </p>
            <p>{{ $ctrl.clickedHero.powerstats.durability }} </p>
            <p>Power: </p>
            <p>{{ $ctrl.clickedHero.powerstats.power }} </p>
            <p>Combat: </p>
            <p>{{ $ctrl.clickedHero.powerstats.combat }} </p>
        </section>
       
    </section>

    `,
    controller: ["GameService", function(GameService){
        const vm = this;
        vm.heroes = [
            {
            'name': "Captain America",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/274.jpg',
            'id': 149
            }, 
            {
            'name': "Wonder Woman",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/807.jpg',
            'id': 720
            },  
            {
            'name': "Batman",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg',
            'id': 70
            }
            , 
            {
            'name': "The Incredible Hulk",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/83.jpg',
            'id': 332
            }, 
            {
            'name': "Spider Man",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg',
            'id': 620
            }, 
            {
            'name': "Storm",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/135.jpg', 
            'id': 638
            }
            ]
        // make a function that connects each 6 pre-set heroes to respective character info --> character comp
        vm.hero = {};
        vm.clickedHero = {};
        vm.viewHero = (hero) => {
            
            //sends the clicked hero data to service so entire application can utilize
            GameService.sendHero(hero);

            //retrieves that stored data from GameService
            vm.clickedHero = GameService.retrieveHero();
            console.log(vm.clickedHero);

            
            //api call to view hero at that id
            GameService.getPlayer(vm.clickedHero.id).then((response)=> {
                vm.clickedHero = response;
            })
        
        };
    }]






}

angular
    .module("app")
    .component("home", home);