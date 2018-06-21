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
        
        <section class="clickedHero_stats">
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
            },
            {
            'name': "Black Panther",
            'url': 'https://www.superherodb.com/pictures2/portraits/10/100/247.jpg',
            'id': 106
            }
           
            ]
        // make a function that connects each 6 pre-set heroes to respective character info --> character comp
        vm.hero = {};
        vm.clickedHero = {};
        //initiate the ng-show on the character stats pop up to false
        vm.showMe = false;
        const popUp = document.querySelector(".clickedHero_stats");
            console.log(popUp);
        const main = document.querySelector(".main");
        

        vm.viewHero = (hero) => {
      //animates the clickedHero_stats pop up
      
      setTimeout(function(){

        angular.element(popUp).css("display", "flex");
    angular.element(popUp).addClass("animated rotateIn");
      }, 200);
                  
                   
            //sends the clicked hero data to service so entire application can utilize
            GameService.sendHero(hero);

            //retrieves that stored data from GameService
            vm.clickedHero = GameService.retrieveHero();
            
            //api call to view hero at that id
            GameService.getPlayer(vm.clickedHero.id).then((response)=> {
                //change ng-show me to true to display the pop up
              
        // vm.showMe= true;
                vm.clickedHero = response;
            })
        };

        vm.chooseDifHero = () => {
            //hide the character stats popup
            angular.element(popUp).addClass("animated rotateOut");
            // angular.element(popUp).css("display", "none");
    
            setTimeout(() => {
                angular.element(popUp).removeClass("animated rotateOut");
                angular.element(popUp).css("display", "none");
                vm.clickedHero = {};
            }, 1000);
        }
        
        vm.viewBattle = () => {
            angular.element(main).addClass("animated fadeOut");

            setTimeout(() => {
                
                angular.element(main).removeClass("animated fadeOut");
                GameService.viewBattle();
            }, 1000);


            vm.changeNavColor();
        };
        

      

        vm.changeNavColor = () => {
            let color1 = "";
            let color2 = "";
            let color3 = "";
            let navInner = document.querySelectorAll(".nav_inner");
            let asideInner = document.querySelectorAll(".aside_inner");
            let body = document.querySelector("body");
            
            console.log(vm.clickedHero.name);
            switch(vm.clickedHero.name) {

                case "Captain America":
                    color1 = "1DAFE6",
                    color2 = "96d2e7",
                    color3 = "e68f8d"
                break;

                case "Wonder Woman":
                    color1 = "F3CA5A",
                    color2 = "f1d893",
                    color3 = "BC3A30"
                break;

                case "Batman":
                    color1 = "12211A",
                    color2 = "89908E",
                    color3 = "FEEB81"
                break;

                case "Hulk":
                    color1 = "A8E75A",
                    color2 = "6f9c37",
                    color3 = "6B3A89"
                break;

                case "Spider-Man":
                    color1 = "BC3A30",
                    color2 = "b87671",
                    color3 = "0E1213"
                break;

                case "Storm":
                    color1 = "8565D5",
                    color2 = "ae9ed4";
                    color3 = "DDD4E4"
                break;

                case "Black Panther":
                    color1 = "050608",
                    color2 = "433D71",
                    color3 = "E8BF71"
                break;

            }
            console.log(navInner);
        
            angular.element(navInner).css(`background`, `linear-gradient(to bottom, #${color1}, #${color2})`);
            angular.element(asideInner).css(`background`, `linear-gradient(to left, #${color1} 50%, #${color2})`);
            angular.element(body).css(`background-color`, `#${color3}`);
            
        }
    }]
}

angular
    .module("app")
    .component("home", home);