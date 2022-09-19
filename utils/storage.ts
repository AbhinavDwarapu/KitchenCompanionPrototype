import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { Drivers, Storage } from "@ionic/storage";
import { Category, Ingredient, Recipe, Tag } from "./types";
import { v4 as uuidv4 } from "uuid";

export function wrapWithId(object: Recipe | Ingredient | Category | Tag) {
  object.id = uuidv4();
  return object;
}

export function generateId() {
  return uuidv4();
}

export async function storageInit(
  type: "recipe" | "ingredient" | "category" | "tag"
) {
  const store = new Storage({
    name: type,
    driverOrder: [
      CordovaSQLiteDriver._driver,
      Drivers.IndexedDB,
      Drivers.LocalStorage,
    ],
  });
  await store.defineDriver(CordovaSQLiteDriver);
  await store.create();

  return store;
}

export async function addObjectToDb(
  object: Recipe | Ingredient | Category | Tag,
  type: "recipe" | "ingredient" | "category" | "tag"
) {
  const store = await storageInit(type);

  await store.set(object.id, object);
  return 0;
}

export async function getObjectFromDb(
  id: string,
  type: "recipe" | "ingredient" | "category" | "tag"
) {
  const store = await storageInit(type);
  return store.get(id);
}

export async function getObjectByNameFromDb(
  name: string,
  type: "recipe" | "ingredient" | "category" | "tag"
) {
  const store = await getAllObjectsFromDb(type);
  for (let i = 0; i < store.length; i += 1) {
    if (store[i].name === name) {
      return store[i];
    }
  }
}

export function getOrderedCategoryKeys(sortedIngredients: {
  [p: string]: Ingredient[];
}) {
  const keys = Object.keys(sortedIngredients);
  keys.sort();
  if (keys.indexOf("Misc.") !== -1) {
    keys.splice(keys.indexOf("Misc."), 1);
    keys.unshift("Misc.");
  }
  return keys;
}

export function getIngredientsByCategory(ingredients: Ingredient[]) {
  const sortedArray: { [index: string]: Ingredient[] } = {};
  const categories: Set<string> = new Set();

  ingredients.map((ingredient) => {
    if (Object.keys(sortedArray).includes(ingredient.category.name)) {
      // Category exists
      sortedArray[ingredient.category.name].push(ingredient);
    } else {
      // Category does not exist
      sortedArray[ingredient.category.name] = [];
      sortedArray[ingredient.category.name].push(ingredient);
    }
  });
  return sortedArray;
}

export async function getAllObjectsFromDb(
  type: "recipe" | "ingredient" | "category" | "tag"
) {
  const store = await storageInit(type);
  const keys = await store.keys();

  const list: Recipe[] | Ingredient[] | Category[] | Tag[] = [];

  for (let i = 0; i < keys.length; i += 1) {
    list.push(await store.get(keys[i]));
  }
  return list;
}

export async function deleteObjectFromDb(
  id: string,
  type: "recipe" | "ingredient" | "category" | "tag"
) {
  const store = await storageInit(type);
  await store.remove(id);
}

export async function clearDbs() {
  const Recipes = await storageInit("recipe");
  const Ingredients = await storageInit("ingredient");
  const Categories = await storageInit("category");
  const Tags = await storageInit("tag");

  await Recipes.clear();
  await Ingredients.clear();
  await Categories.clear();
  await Tags.clear();
}

export async function cupboardHasIngredients(recipe: Recipe) {
  let missing = 0;
  if (typeof recipe.ingredients === "undefined") {
    return missing;
  }

  for (let i = 0; i < recipe.ingredients.length; i += 1) {
    const tempIngredient = (await getObjectFromDb(
      recipe.ingredients[i].id,
      "ingredient"
    )) as Ingredient;
    let tempRecipeQuantity = recipe.ingredients[i]?.quantity;
    let tempDbRecipeQuantity = tempIngredient?.quantity;

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
