var EmporiumOfMiscellany = function(shopkeeper, float, itemsForSale){
  this.shopkeeper = shopkeeper;
  this.float = float;
  this.itemsForSale = itemsForSale;
}

EmporiumOfMiscellany.prototype = {
  buyTreasure: function(treasure, seller){
    if(this.float >= treasure.value){
      seller.removeATreasure(treasure);
      this.float -= treasure.value;
      seller.cash += treasure.value;
      treasure.value = treasure.value * 2;
      this.itemsForSale.push(treasure);
    }
  },

  addStock: function(item){
    this.itemsForSale.push(item);
    this.float -= item.value;
  },

  removeItem: function(item){
    var index = this.itemsForSale.indexOf(item);
    this.itemsForSale.splice(index, 1);
  },

  sellItem: function(item){
    this.removeItem(item);
    this.float += item.value;
  }

}

module.exports = EmporiumOfMiscellany;