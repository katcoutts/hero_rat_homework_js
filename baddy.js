var Baddy = function(name, health, weapon, strength, drunk, treasure){
  this.name = name;
  this.health = health;
  this.weapon = weapon;
  this.strength = strength;
  this.drunk = drunk;
  this.treasure = treasure;
}

Baddy.prototype = {
  talk: function(){
    return "Rrrragh. I am " + this.name;
  },

  hits: function(hero){
    if (hero.forceShield > 0){
      hero.forceShield -= 1;
    }
    else{
      hero.health -= this.strength/5;
    }
      if (hero.health < 0){
        hero.health = 0;
      }
  },

  drinks: function(){
    this.drunk = true;
    this.strength = this.strength / 2;
  },

  addTreasure: function(treasure){
    this.treasure.push(treasure);
  }

}

module.exports = Baddy;