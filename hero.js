var Hero = function(name, favouriteFood, health, weapon, strength, forceShield){
  this.name = name;
  this.favouriteFood = favouriteFood;
  this.health = health;
  this.weapon = weapon;
  this.strength = strength;
  this.forceShield = forceShield;
  this.treasureBag = [];
}

Hero.prototype = {
  talk: function(){
    return "Hi, I'm " + this.name + " the hero";
  },
  eat: function(food){
    if (food.poisonous === true){
      this.health = this.health/2;
    }
    else if (food.name === this.favouriteFood){
      this.health += food.replenishmentValue * 1.5;
    }
    else {
      this.health += food.replenishmentValue;
    }
    if (this.health > 120){
      this.health = 120;
    }
  },

  attacks: function(baddy){
    baddy.health -= this.strength/4;   
  },

  treasureValue: function(){
    var value = 0;
    for (var treasure of this.treasureBag){
      value += treasure.value;
    }
    return value;
  },

  killerBlow: function(baddy){
    if (this.health == 120){
      baddy.health = 0;
    }
  },

  getTreasure: function(treasure){
    this.treasureBag.push(treasure);
  },

  takeBaddyTreasure: function(baddy){
    if (baddy.health === 0){
    this.treasureBag = this.treasureBag.concat(baddy.treasure);
    }
  }

}


module.exports = Hero;