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


      <section class="gameIntro">
        <div class="gameIntro_inner">
            <h2>Study for school, save the world!</h2>
            <p>
            Battle a villainous opponent by answering trivia questions.
            </p>
            <p>
            Correctly answer the questions to defeat the villain and move on to the next round.
            </p>
            <p>
            Keep an eye on your health bar...
            </p>
            <button ng-click="$ctrl.hideGameIntro();" class="gameIntro_button">OK?</button>
        </div>
      </section>
    `,

    controller: ["GameService", function(GameService){
            const vm = this;
            const allGrades = document.querySelectorAll(".grade");
            const allSubjects = document.querySelectorAll(".subject");
            const swing = document.getElementById("swing");
            const squeeze = document.getElementById("squeeze");
        
            vm.user = {};
            vm.randomNum = GameService.getRandomNum();
            vm.gameIntro = document.querySelector(".gameIntro");
            GameService.createRandomNum(); 
            GameService.setOpponent(vm.randomNum);

            vm.showAsideImage = () => {
                let windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                
                if(windowWidth > 768){
                angular.element(aside_image).addClass("customSwingIn");
                swing.play(); 
                }
            }

            vm.hideGameIntro = () => {
                angular.element(vm.gameIntro).addClass("animated zoomOut");

                setTimeout(() => {
                    angular.element(vm.gameIntro).css("display", "none");
                    vm.showAsideImage();
                }, 1000);
            }

            vm.setGrade = (grade, $event) =>{
                squeeze.play();
                angular.element(allGrades).css("background-color", "#46a7dc");

                angular.element($event.target).css("background-color", "black");
            
                angular.element($event.target).addClass("rubberBand");
                vm.user.grade = grade;
            }
            
            vm.setSubject = (subject, $event) =>{
                squeeze.play();
                    angular.element(allSubjects).css("background-color", "#d01e00");
                
                    angular.element($event.target).css("background-color", "black");
                    angular.element($event.target).addClass("rubberBand");
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