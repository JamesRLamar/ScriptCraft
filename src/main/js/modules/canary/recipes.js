var cm = Packages.net.canarymod;
var cmRecipe = cm.api.inventory.recipes.CraftingRecipe;
var cmRecipeRow = cm.api.inventory.recipes.RecipeRow;

function addRecipe( recipe ){
  if (!recipe){
    return null;
  }
  var result,
    rows,
    i,j,
    cells,
    rr;
  if (recipe.shape){
    rows = [];
    for (i = 0; i < recipe.shape.length; i++){
      cells = recipe.shape[i].split('');
      rr = [];
      for ( j = 0; j < cells.length ; j++){
	if (cells[j] != ' '){
	  rr.push(recipe.ingredients[cells[j]]);
	}
      }
      rows.push( new cmRecipeRow(recipe.shape[i], rr) );
    }
    result = __plugin.makeShapedRecipe( recipe.result, rows);
  } else { 
    result = __plugin.makeShapelessRecipe( recipe.result, recipe.ingredients );
  }
  return result;
}
function removeRecipe( recipe ){
  server.removeRecipe( recipe );
}
exports.add = addRecipe;
exports.remove = removeRecipe;
