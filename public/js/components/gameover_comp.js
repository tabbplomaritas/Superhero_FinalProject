//TODO:generates  the winner announcement 

//TODO:create a button to to back to home screen

//TODO:reset power levels


"use strict";
console.log("gameove comp is working");

const gameover = {

  template:`
  <section class="main">
  <p> TEST </p>

  </section>
 

  `,

  controller: ["GameService", function (GameService) {
    const vm = this;
}]

}

angular
  .module("app")
  .component("gameover", gameover);