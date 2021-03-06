var ItemType = Packages.net.canarymod.api.inventory.ItemType;
var Canary = Packages.net.canarymod.Canary;
var itemFactory = Canary.factory().itemFactory;

function items( material, amount ) {
  material = material.toUpperCase();
  var result = itemFactory["newItem(net.canarymod.api.inventory.ItemType)"](material);
  result.amount = amount;
  return result;
}

var materials = ItemType.class.getDeclaredFields();

for (var i = 0;i < materials.length; i++ ){

  if (materials[i].type != ItemType.class) {
    continue;
  }
  var materialField = materials[i];
  var name = (''+materialField.name).replace(/^(.)/,function(a){ return a.toLowerCase() });
  
  items[name] = (function(material){
    return function(amount){
      if (typeof amount == 'undefined'){
	return material;
      }
      if (typeof amount == 'number'){
	var itemStack = itemFactory["newItem(net.canarymod.api.inventory.ItemType)"](material);
	itemStack.amount = amount;
	return itemStack;
      } else {
	var result = (amount == material);
	if (!result){
	  if (amount.getId && amount.getData){
	    var m2 = ItemType.fromIdAndData(amount.id, amount.data);
	    result = (m2 == material);
	  }
	}
	return result;
      }
    };
  })(materialField.get(ItemType));
}

module.exports = items;
