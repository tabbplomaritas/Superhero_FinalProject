"use strict";
console.log("start game comp is alive");

const startGame ={

    template:`
     <form ng-submit="$ctrl.sendUserInfo($ctrl.user)">
         <p> Welcome Enter Your Name and Age to defeat Villains of the Galaxy </p>
        <input type="text" placeholder="Name" ng-model="$ctrl.user.name">
         <p ng-click="$ctrl.setAge('8-10', $event);">8-10</p>
         <p ng-click="$ctrl.setAge('11-13', $event);">11-13</p>
         <p ng-click="$ctrl.setAge('14-16', $event);">14-16</p>
        <button> Submit </button>
      </form>
    `,

    controller: ["GameService", function(GameService){
        const vm = this;
       
        vm.user = {};


        vm.setAge = (age, $event) =>{
            console.log($event.target);
            angular.element($event.target).css("background-color", "#FFFFFF");
            vm.user.age = age;
            console.log(vm.user);
        }

         vm.sendUserInfo = (user) => {
             console.log(user);
            GameService.sendUserInfo(user);
         }


         }]
        }
angular
    .module("app")
    .component("startGame",startGame)