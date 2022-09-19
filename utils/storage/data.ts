import { Ingredient, Recipe } from "../types";
import { v4 as uuidv4 } from "uuid";
import { getFromDb } from "./localStore";

// Generate id
export function generateId() {
  return uuidv4();
}

// Order categories alphabetically and push "Misc." to end
export function getOrderedCategoryKeys(sortedIngredients: {
  [p: string]: Ingredient[];
}) {
  const keys = Object.keys(sortedIngredients);
  keys.sort();

  // Push "Misc." category to end
  if (keys.indexOf("Misc.") !== -1) {
    keys.splice(keys.indexOf("Misc."), 1);
    keys.unshift("Misc.");
  } else {
    keys.unshift("Misc.");
  }
  return keys;
}

// Return number of missing ingredients
export async function missingIngredients(recipe: Recipe) {
  let missing = 0;
  if (typeof recipe.ingredients === "undefined") {
    return missing;
  }

  // Get ingredient from cupboard to compare
  for (let i = 0; i < recipe.ingredients.length; i += 1) {
    const tempIngredient = (await getFromDb(
      recipe.ingredients[i].id,
      "ingredient"
    )) as Ingredient;
    let tempRecipeQuantity = recipe.ingredients[i]?.quantity;
    let tempDbRecipeQuantity = tempIngredient?.quantity;

    // Both quantities exist
    if (
      typeof tempRecipeQuantity === "undefined" ||
      typeof tempDbRecipeQuantity === "undefined"
    ) {
      continue;
    }
    if (tempDbRecipeQuantity < tempRecipeQuantity) {
      missing += 1;
    }
  }
  return missing;
}
