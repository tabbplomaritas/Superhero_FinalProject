"use strict";

const startGame ={

    template:`
     <form class="userInfoForm">
    
         <h3>Enter Your Name, Subject & Grade to defeat Villains of the Galaxy </h3>
        <input type="text" placeholder="Name" ng-model="$ctrl.user.name">
        
        <section class="userInfoForm_selections">
            
            <div class="userInfoForm_Subject animated slideInRight">
                <h3>Select Your Subject:</h3>
                <div class="userInforForm_Subject_opts">
                    <p class="subject animated" ng-click="$ctrl.setSubject('English', $event);">ENGLISH</p>
                    <p class="subject animated" ng-click="$ctrl.setSubject('Math', $event);">MATH</p>
                    <p class="subject animated" ng-click="$ctrl.setSubject('Science', $event);">SCIENCE</p>
                    <p class="subject animated" ng-click="$ctrl.setSubject('History', $event);">HISTORY</p>
                </div>
            </div>

            <div class="userInfoForm_Grade animated slideInLeft">
                <h3>Select Your Grade:</h3>
                <div class="userInforForm_Grade_opts">
                    <p class="grade animated" ng-click="$ctrl.setGrade(6, $event);">6TH GRADE!</p>
                    <p class="grade animated" ng-click="$ctrl.setGrade(7, $event);">7TH GRADE!</p>
                    <p class="grade animated" ng-click="$ctrl.setGrade(8, $event);">8TH GRADE!</p>
                </div>
            </div>

        </section>

        <img class="beginAdv" ng-click="$ctrl.sendUserInfo($ctrl.user)" src="../../assets/design/readyToBattle-01.png">
    
      </form>
    `,

    controller: ["GameService", function(GameService){
        const vm = this;
        const allGrades = document.querySelectorAll(".grade");
        const allSubjects = document.querySelectorAll(".subject");
        vm.user = {};
        GameService.createRandomNum(); 
        const swing = document.getElementById("swing");
      
        vm.randomNum = GameService.getRandomNum();
        GameService.setOpponent(vm.randomNum);

        //rope swing sound when aside image slides in
        setTimeout(() => {
            swing.play();
        }, 2350);
     
        

        vm.setGrade = (grade, $event) =>{
            angular.element(allGrades).css("background-color", "#46a7dc");

            angular.element($event.target).css("background-color", "black");
           
            angular.element($event.target).addClass("rubberBand");
            vm.user.grade = grade;
        }
         
        vm.setSubject = (subject, $event) =>{
                angular.element(allSubjects).css("background-color", "#d01e00");
            
                angular.element($event.target).css("background-color", "black");
                angular.element($event.target).addClass("rubberBand");
                vm.user.subject = subject;
                console.log(vm.user);
                
        }

         vm.sendUserInfo = (user) => {
            GameService.sendUserInfo(user);
         }


         }]
        }
angular
    .module("app")
    .component("startGame",startGame)