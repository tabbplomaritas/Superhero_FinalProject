"use strict";
console.log("quiz questions here");

const easyQuestions = {

template: 
`
`,

controller: ["GameService", function(GameService){
        const vm = this;

        vm.questions=
        [{
                question: "What is half of 50?",
                options: [10,4,16,25],
                answer:25
        },
        {
                question: "Which of the following is not a type of liquid associated with a erupting volcano?", 
                options:["Magma","Water","Lava"],
                answer:"Water"
        },
        {
        
                question: "Glass is made from ... ?",
                options:["Heating sand","Weaving fibres","Wood from trees"],
                answer:"Heating sand"
                
        

        },
        {
                question:"You have a shadow because...?",
                options:["You give off light","Light curves around you","You are blocking light"],
                answer:"You are blocking light"

        },
        {

                question:"How many continents are there?",
                options:[5,8,9,7],
                answer:7

        },
        {
                question:"what is a baby kangaroo called?",
                options:["worm","pup","Joey","cub"],
                answer:"Joey"

        },
        {

                question:"Who invented the Telephone?",
                options:["Nikola Tesla","Thomas Edison","Johann Danial","Alexander Graham Bell"],
                answer:"Alexander Graham Bell"
        },
        {
                question:" If you boil water, what do you get??",
                options:["Ice","Steam","Nothing","Freeze"],
                answer:"Steam"

        },
        {
                question:"What color are the stars on the United States of America Flag?",
                options:["Red","White","Blue"],
                answer:"White"

        },
        {
                question:"If you are outside and your shadow is in front of you then the Sun is ... ?",
                options:["In front of you","Behind you"],
                answer:"Behind you"
        },

        ]

        console.log("hi is this working? ");
        console.log(vm.questions);


        GameService.sendQuestions(vm.questions);

}]
}

angular
    .module("app")
    .component("easyQuestions", easyQuestions);