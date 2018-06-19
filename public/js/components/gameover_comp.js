//TODO:generates  the winner announcement 
// TODO: GET winner from battle comp
//TODO:create a button to to back to home screen

//TODO:reset power levels


"use strict";
console.log("gameover comp is working");

const gameover = {

  template:`
  <section class="main">
    <h2>
    {{ $ctrl.winner.name }}
    </h2>
  </section>
 

  `,

  controller: ["GameService", function (GameService) {
    const vm = this;

    // gets winner from battle comp
    vm.winner = GameService.getWinner();
    console.log(vm.winner);
}]

}

angular
  .module("app")
  .component("gameover", gameover);