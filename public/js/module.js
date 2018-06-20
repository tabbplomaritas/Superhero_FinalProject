"use strict"



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
        .when("/startgame",{
            template:"<start-game></start-game>"
        })
        .otherwise({
            redirectTo:"/startgame"
        });
    });  