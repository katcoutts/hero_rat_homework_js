var EmporiumOfMiscellany = function(shopkeeper, float, itemsForSale){
  this.shopkeeper = shopkeeper;
  this.float = float;
  this.itemsForSale = itemsForSale;
}

EmporiumOfMiscellany.prototype = {
  buyTreasure: function(treasure){
    if (this.float >= treasure.value){
    this.float -= treasure.value;
    treasure.value = treasure.value * 2;
    this.itemsForSale.push(treasure);
    }
  }
}

module.exports = EmporiumOfMiscellany;