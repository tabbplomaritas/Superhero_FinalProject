"use strict";

const startGame ={

    template:`
     <form class="userInfoForm">
    
         <h3>Enter Your Name and Age to defeat Villains of the Galaxy </h3>
        <input type="text" placeholder="Name" ng-model="$ctrl.user.name">
        <div class="userInfoForm_Grade">
            <p class="grade animated" ng-click="$ctrl.setGrade(6, $event);">6TH GRADE!</p>
            <p class="grade animated" ng-click="$ctrl.setGrade(7, $event);">7TH GRADE!</p>
            <p class="grade animated" ng-click="$ctrl.setGrade(8, $event);">8TH GRADE!</p>
         </div>
         <div class="userInfoForm_Subject">
         <p class="subject animated" ng-click="$ctrl.setSubject(Eng, $event);">ENGLISH</p>
         <p class="subject animated" ng-click="$ctrl.setSubject(Mat, $event);">MATH</p>
         <p class="subject animated" ng-click="$ctrl.setSubject(Sci, $event);">SCIENCE</p>
         <p class="subject animated" ng-click="$ctrl.setSubject(His, $event);">HISTORY</p>
      </div>
        <img class="beginAdv" ng-click="$ctrl.sendUserInfo($ctrl.user)" src="../../assets/design/readyToBattle-01.png"</button>
      </form>
    `,

    controller: ["GameService", function(GameService){
        const vm = this;
        const allGrades = document.querySelectorAll(".grade");
        const allSubjects = document.querySelectorAll(".subject");
        vm.user = {};
        GameService.createRandomNum(); 
  

        vm.setGrade = (grade, $event) =>{
            console.log($event.target);
            
            console.log(allGrades);
            
            angular.element(allGrades).css("background-color", "red");
        
            // angular.element(allGrades).css("box-shadow", "none");

            angular.element($event.target).css("background-color", "#000000");
            angular.element($event.target).addClass("rubberBand");
            // angular.element($event.target).css("box-shadow", "3px 2 px 3px 3px black");
            vm.user.grade = grade;
        }
         
        vm.setSubject = (subject, $event) =>{
                console.log($event.target);
                
                console.log(allSubjects);
                
                angular.element(allSubjects).css("background-color", "red");
            
                //  angular.element(allGrades).css("box-shadow", "none");

                angular.element($event.target).css("background-color", "#000000");
                angular.element($event.target).addClass("rubberBand");
                // angular.element($event.target).css("box-shadow", "3px 2 px 3px 3px black");
                vm.user.subject = subject;
        }

         vm.sendUserInfo = (user) => {
            GameService.sendUserInfo(user);
         }


         }]
        }
angular
    .module("app")
    .component("startGame",startGame)