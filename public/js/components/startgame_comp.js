"use strict";
console.log("start game comp is alive");

const startGame ={



    template:`
     <form ng-submit="$ctrl.getUserInfo($ctrl.userName)">
         <p> Welcome Enter Your Name and Age to defeat Villains of the Galaxy </p>
        <input type="text" placeholder="Name" ng-model="$ctrl.userName">
         <p ng-click="$ctrl.setAge('8-10');">8-10</p>
         <p ng-click="$ctrl.setAge('11-13');">11-13</p>
         <p ng-click="$ctrl.setAge('14-16');">14-16</p>
        <button> Submit </button>
      </form>
    `,

    controller: ["GameService", function(GameService){
        const vm = this;
       
         vm.userName = "";
         vm.userAge = "";
        vm.setAge = (age) =>{
            vm.userAge = age;
            console.log(vm.userAge);

        }

         vm.getUserInfo = (userName) => {
             console.log(newUser);
            GameService.sendUserInfo(newUser);

         }


         }]
        }
angular
    .module("app")
    .component("startGame",startGame)