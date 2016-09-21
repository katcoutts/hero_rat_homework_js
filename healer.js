var Healer = function(name, healingPower){
  this.name = name;
  this.healingPower = healingPower;
}

Healer.prototype = {
  
  heal: function(hero){
    hero.health += this.healingPower;
    if (hero.health >= 120){
      hero.health = 120;
    }
  },

  talk: function(){
    return "I am " + this.name + " and I have great healing powers."
  }

}

module.exports = Healer;
