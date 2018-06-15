"use strict"

console.log("Module is Working");

angular 
    .module("app",["ngRoute"])
    .config(($routeProvider)=>{
        $routeProvider
        .when("/home",{
            template:"<home></home>"
        })
        .when("/character",{
            template:"<character></character>"
        })
        .when("/battle",{
            template:"<battle></battle>"
        })
        .when("/gameover",{
            template:"<gameover></gameover>"
        })
        .otherwise({
            redirectTo:"/home"
        });
    });  