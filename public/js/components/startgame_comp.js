"use strict";
console.log("start game comp is alive");

const startGame ={

    template:`
     <form class="userInfoForm" ng-submit="$ctrl.sendUserInfo($ctrl.user)">
    
         <h3>Enter Your Name and Age to defeat Villains of the Galaxy </h3>
        <input type="text" placeholder="Name" ng-model="$ctrl.user.name">
        <div class="userInfoForm_Grade">
            <p ng-click="$ctrl.setGrade(6, $event);">6TH GRADE!</p>
            <p ng-click="$ctrl.setGrade(7, $event);">7TH GRADE!</p>
            <p ng-click="$ctrl.setGrade(8, $event);">8TH GRADE!</p>
         </div>
        <button> Begin the Adventure </button>
      </form>
    `,

    controller: ["GameService", function(GameService){
        const vm = this;
       
        vm.user = {};


        vm.setGrade = (grade, $event) =>{
            console.log($event.target);
            angular.element($event.target).css("background-color", "#FFFFFF");
            vm.user.grade = grade;
            console.log(vm.user.grade);
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