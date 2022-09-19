import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { Drivers, Storage } from "@ionic/storage";
import { Category, Ingredient, Recipe, Tag } from "../types";

// Initialise a store based on type
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

// Add to database
export async function addToDb(
  object: Recipe | Ingredient | Category | Tag,
  type: "recipe" | "ingredient" | "category" | "tag"
) {
  const store = await storageInit(type);

  await store.set(object.id, object);
  return 0;
}

// Get from database
export async function getFromDb(
  id: string,
  type: "recipe" | "ingredient" | "category" | "tag"
) {
  const store = await storageInit(type);
  return store.get(id);
}

// Get from database without an id
export async function getByNameFromDb(
  name: string,
  type: "recipe" | "ingredient" | "category" | "tag"
) {
  if (type === "category" || type === "tag") {
    const store = (await getAllFromDb(type)) as Category[] | Tag[];
    for (let i = 0; i < store.length; i += 1) {
      if (store[i].id.toLowerCase() === name.toLowerCase()) {
        return store[i];
      }
    }
  } else {
    const store = (await getAllFromDb(type)) as Ingredient[] | Recipe[];
    for (let i = 0; i < store.length; i += 1) {
      if (store[i].name.toLowerCase() === name.toLowerCase()) {
        return store[i];
      }
    }
  }
}

// Get ingredients by category
export function getIngredientsByCategory(ingredients: Ingredient[]) {
  const sortedArray: { [index: string]: Ingredient[] } = {};

  // Create "Misc." for ingredients without a category
  sortedArray["Misc."] = [];

  ingredients.map((ingredient) => {
    if (typeof ingredient.category !== "undefined") {
      if (Object.keys(sortedArray).includes(ingredient.category.id)) {
        // Category exists
        sortedArray[ingredient.category.id].push(ingredient);
      } else {
        // Category does not exist, create array for it
        sortedArray[ingredient.category.id] = [];
        sortedArray[ingredient.category.id].push(ingredient);
      }
    } else {
      // Ingredient does not have a category, push it to "Misc."
      sortedArray["Misc."].push(ingredient);
    }
  });
  return sortedArray;
}

// Get all objects from a db type
export async function getAllFromDb(
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

// Delete an object from a db
export async function deleteFromDb(
  id: string,
  type: "recipe" | "ingredient" | "category" | "tag"
) {
  const store = await storageInit(type);
  await store.remove(id);
}

// Clear all dbs
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
