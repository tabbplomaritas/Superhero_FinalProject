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
        
        <section ng-show="$ctrl.showMe" class="clickedHero_stats">
            <p class="clickedHero_name" ng-model="$ctrl.clickedHero.name">{{ $ctrl.clickedHero.name }}</p>

            <img ng-model="$ctrl.clickedHero.image.url" src="{{$ctrl.clickedHero.image.url}}">

            <h3>Hero Power stats:</h3>

            <section class="clickedHero_powerstats">
                <div class="clickedHero_powerstats_trait">
                    <p>Intelligence: </p>
                    <p>{{ $ctrl.clickedHero.powerstats.intelligence }} </p>
                </div>
                <div class="clickedHero_powerstats_trait">
                    <p>Strength: </p>
                    <p>{{ $ctrl.clickedHero.powerstats.strength }} </p>
                </div>
                <div class="clickedHero_powerstats_trait">
                    <p>Speed: </p>
                    <p>{{ $ctrl.clickedHero.powerstats.speed }} </p>
                </div>
                <div class="clickedHero_powerstats_trait">
                    <p>Durability: </p>
                    <p>{{ $ctrl.clickedHero.powerstats.durability }} </p>
                </div>
                <div class="clickedHero_powerstats_trait">
                    <p>Power: </p>
                    <p>{{ $ctrl.clickedHero.powerstats.power }} </p>
                </div>
                <div class="clickedHero_powerstats_trait">
                    <p>Combat: </p>
                    <p>{{ $ctrl.clickedHero.powerstats.combat }} </p>
                </div>
            </section>

            <div class="clickedHero_buttons">
                <img id="backToHeroes" ng-click="$ctrl.chooseDifHero()" src="../../assets/design/backtoheroes-01.png">
                <img id="readyToBattle" ng-click="$ctrl.viewBattle()" src="../../assets/design/readyToBattle-01.png">
                
               
            </div>
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
        //initiate the ng-show on the character stats pop up to false
        vm.showMe = false;
        vm.viewHero = (hero) => {
            //change ng-show me to true to display the pop up
            vm.showMe= true;
            console.log(vm.showMe);
            
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

        vm.chooseDifHero = () => {
            //hide the character stats popup
            vm.showMe = false;
            console.log(vm.clickedHero);
            console.log("click");
            vm.clickedHero = {};
            console.log(vm.clickedHero);
        }
        vm.viewBattle = () => {
            GameService.viewBattle();
            console.log("battle click");
        }


    }]






}

angular
    .module("app")
    .component("home", home);