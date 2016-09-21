// Rats should be able to touch food, if they do the food becomes poisonous.
// Heroes that eat poisonous food should lose health.

var Rat = function(name){
  this.name = name;
}

Rat.prototype = {
  touchFood: function(food){
    food.poisonous = true;
  }
}


module.exports = Rat;

