var assert = require('assert');
var Hero = require('../hero');
var Food = require('../food')
var Rat = require('../rat')
var Baddy = require('../baddy')
var Healer = require('../healer')
var Treasure = require('../treasure')
var EmporiumOfMiscellany = require('../emporium_of_miscellany')
var Steed = require('../steed')

describe( 'Hero', function() {

  var charley
  var gamePie
  var chips
  var apple
  var robbie
  var diamond
  var ruby
  var stallion

  beforeEach(function(){
    charley = new Hero("Charley", "game pie", 85, "golf club", 100, 1, 50, 12);
    gamePie = new Food("game pie", 15, false);
    chips = new Food("chips", 5, false);
    apple = new Food("apple", 5, true);
    ruby = new Treasure("ruby", 2000);
    stallion = new Steed("Thunderbolt", 20);
    diamond = new Treasure("diamond", 5000);
    robbie = new Baddy("Robbie the Destroyer", 90, "shovel", 100, false, [diamond, ruby]);
  })

  it("should have a name", function(){ 
    assert.equal("Charley", charley.name);
  })

  it("should be able to talk", function(){
    assert.equal("Hi, I'm Charley the hero", charley.talk());
  })

  it("has a weapon", function(){
    assert.equal("golf club", charley.weapon);
  })

  it("should have health", function(){
    assert.equal(85, charley.health);
  })

  it("should be able to ride a steed", function(){
    assert.deepEqual("Racing along at 20 miles per hour", charley.rideSteed(stallion));
  })

  it("should have favourite food", function(){
    assert.equal("game pie", charley.favouriteFood);
  })

  it("should increase health when eats", function(){
    charley.eat(chips);
    assert.equal(90, charley.health);
  })

  it("health increases more if food is favourite food", function(){
    charley.eat(gamePie);
    assert.equal(107.5, charley.health);
  })

  it("treasure starts empty", function(){
    assert.deepEqual([], charley.treasureBag);
  })

  it("can collect treasure", function(){
    charley.getTreasure(diamond);
    assert.deepEqual([diamond], charley.treasureBag);
  })

  it("can get value of all treasure", function(){
    charley.getTreasure(diamond);
    charley.getTreasure(diamond);
    assert.deepEqual([diamond, diamond], charley.treasureBag);
    assert.equal(10000, charley.treasureValue());
  })

  it("can remove a treasure", function(){
    charley.getTreasure(diamond);
    charley.getTreasure(ruby);
    charley.getTreasure(ruby);
    charley.removeATreasure(ruby);
    assert.deepEqual([diamond, ruby], charley.treasureBag);
  })

  it("can get treasure off baddy", function(){
    robbie.health = 0;
    charley.takeBaddyTreasure(robbie);
    assert.deepEqual([diamond, ruby], charley.treasureBag);
  })

  it("loses health if eats poisonous food", function(){
    charley.eat(apple);
    assert.equal(42.5, charley.health);
  })

  it("hero health can't go above 120", function(){
    charley.eat(gamePie);
    charley.eat(gamePie);
    assert.equal(120, charley.health);
  })

  it("should injure baddy with an attack", function(){
    charley.attacks(robbie);
    assert.equal(65, robbie.health);
  })

  it("can deliver killer blow", function(){
    charley.health = 120;
    charley.killerBlow(robbie);
    assert.equal(0, robbie.health);
  })

})


describe( 'Food', function() {

  var gamePie

  beforeEach(function(){
    gamePie = new Food("Game Pie", 15, false);
  })

  it("should have a name", function(){
    assert.equal("Game Pie", gamePie.name);
  })

  it("should have a replenishment value", function(){
    assert.equal(15, gamePie.replenishmentValue);
  })

  it("should have a poisonous value", function(){
    assert.equal(false, gamePie.poisonous);
  })

})


describe( 'Rat', function() {

  var rat
  var chips

  beforeEach(function(){
    rat = new Rat("Ratty");
    chips = new Food("chips", 5, false)
  })

  it("should have a name", function(){
    assert.equal("Ratty", rat.name);
  })

  it("food gets poisonous when touched by Rat", function(){
   rat.touchFood(chips);
   assert.equal(true, chips.poisonous);
  })

})


describe('Baddy', function(){

  var robbie
  var charley
  var diamond
  var ruby

  beforeEach(function(){
    ruby = new Treasure ("ruby", 2000);
    diamond = new Treasure ("diamond", 5000);
    robbie = new Baddy("Robbie the Destroyer", 90, "shovel", 100, false, [diamond, ruby]);
    charley = new Hero("Charley", "game pie", 85, "golf club", 100, 1, 50, 12);
  })

  it("should have a name", function(){
    assert.equal("Robbie the Destroyer", robbie.name);
  })

  it("should be able to talk", function(){
    assert.equal("Rrrragh. I am Robbie the Destroyer", robbie.talk());
  })

  it("doesn't hurt hero if they have a forceShield", function(){
    robbie.hits(charley);
    assert.equal(85, charley.health);
    assert.equal(0, charley.forceShield);
  })

  it("should be able to damage hero with a hit", function(){
    robbie.hits(charley);
    robbie.hits(charley);
    assert.equal(65, charley.health);
  })

  it("gets drunk when has a drink", function(){
    robbie.drinks();
    assert.equal(true, robbie.drunk);
  })

  it("strength decreases when has a drink", function(){
    robbie.drinks();
    assert.equal(50, robbie.strength);
  })

})


describe('Healer', function(){

  var phil
  var charley

  beforeEach(function(){
    phil = new Healer("Phil the Healer", 20);
    charley = new Hero("Charley", "game pie", 85, "golf club", 100, 1, 50, 12);
  })

  it("has a name", function(){
    assert.equal("Phil the Healer", phil.name);
  })

  it("talks", function(){
    assert.equal("I am Phil the Healer and I have great healing powers.", phil.talk());
  })

  it("can heal hero", function(){
    phil.heal(charley);
    assert.equal(105, charley.health);
  })

})


describe( 'EmporiumOfMiscellany', function() {

  var magicalTavern;
  var ruby;
  var diamond;
  var charley;

  beforeEach(function(){
    magicalTavern = new EmporiumOfMiscellany("Alan", 20000, []);
    ruby = new Treasure("ruby", 2000);
    diamond = new Treasure("diamond", 4000);
    charley = new Hero("Charley", "game pie", 85, "golf club", 100, 1, 50, 12);
  })

  it("should have a shopkeeper", function(){
    assert.equal("Alan", magicalTavern.shopkeeper);
  })

  it("should have a float", function(){
    assert.equal(20000, magicalTavern.float);
  })

  it("should be able to pay for treasure", function(){
    charley.getTreasure(ruby);
    magicalTavern.buyTreasure(ruby, charley);
    assert.deepEqual([ruby], magicalTavern.itemsForSale);
    assert.equal(18000, magicalTavern.float);
    assert.equal(2050, charley.cash);
  })

  it("should be able to mark-up value of treasure", function(){
    charley.getTreasure(ruby);
    magicalTavern.buyTreasure(ruby, charley);
    assert.equal(4000, ruby.value);
  })

  it("should be able to sell an item", function(){
    charley.getTreasure(ruby);
    charley.getTreasure(diamond);
    magicalTavern.buyTreasure(ruby, charley);
    magicalTavern.buyTreasure(diamond, charley);
    magicalTavern.sellItem(ruby);
    assert.equal(4000, ruby.value);
    assert.equal(18000, magicalTavern.float);
    magicalTavern.sellItem(diamond);
    assert.equal(26000, magicalTavern.float);
    assert.deepEqual([], magicalTavern.itemsForSale);
  })

})

  describe( 'Steed', function() {

    var stallion;
    var charley;

    beforeEach(function(){
      charley = new Hero("Charley", "game pie", 85, "golf club", 100, 1, 50, 12);
      stallion = new Steed("Thunderbolt", 20);
    })

    it("has a name", function(){
      assert.equal("Thunderbolt", stallion.name);
    })

    it("has a speed", function(){
      assert.equal(20, stallion.speed);
    })

})
