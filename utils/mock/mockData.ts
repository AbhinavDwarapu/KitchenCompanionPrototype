import { Category, Ingredient, Recipe, Tag } from "../types";
import { addToDb, clearDbs } from "../storage/localStore";

export async function initTempData() {
  await clearDbs();

  for (let i = 0; i < Categories.length; i += 1) {
    await addToDb(Categories[i], "category");
  }
  for (let i = 0; i < Tags.length; i += 1) {
    await addToDb(Tags[i], "tag");
  }
  for (let i = 0; i < Ingredients.length; i += 1) {
    await addToDb(Ingredients[i], "ingredient");
  }
  for (let i = 0; i < Recipes.length; i += 1) {
    await addToDb(Recipes[i], "recipe");
  }
}

// 6 Entries
export const Categories: Category[] = [
  {
    id: "Meats",
  },
  {
    id: "Drinks",
    colour: "green",
  },
  {
    id: "Fruits",
    colour: "green",
  },
  {
    id: "Vegetables",
    colour: "blue",
  },
  {
    id: "Misc.",
  },
  {
    id: "Spices",
    colour: "red",
  },
];

// 6 Entries
export const Tags: Tag[] = [
  {
    id: "Vegan",
  },
  {
    id: "Easy",
    colour: "blue",
  },
  {
    id: "Quick",
  },
  {
    id: "Week Days",
    colour: "green",
  },
  {
    id: "To Share",
    colour: "red",
  },
  {
    id: "Fancy",
    colour: "blue",
  },
];

// 8 Entries
export const Ingredients: Ingredient[] = [
  {
    id: "19093cba-781e-4a37-b4b9-a5b45c1d251f",
    name: "32 Characters In Ingredient Name",
    category: Categories[4],
    quantity: 0,
  },
  {
    id: "88fb3938-dcc2-4ab4-818a-258d3d3ebbea",
    name: "Apple",
    category: Categories[2],
    quantity: 0,
  },
  {
    id: "787e596d-17e7-4009-8f65-8cb8f4a48e5f",
    name: "Potato",
    category: Categories[3],
    quantity: 12,
    // alias: ["potatoes", "pomme de terre"],
    expiration: "2023-09-12",
    notes: "Check for discolouration before use!",
    cost: 12.23,
  },
  {
    id: "529655bf-df0f-41e9-884e-afdebe23d8d0",
    name: "Frozen Pizza",
    category: Categories[4],
    quantity: 0,
    unit: "pizza",
    // alias: ["Pizza"],
    expiration: "2023-10-09",
    cost: 2.3,
  },
  {
    id: "5586072b-db10-48b9-b51a-18f7de24cdd2",
    name: "Chicken Breast",
    category: Categories[0],
    quantity: 4,
    unit: "pieces",
    // alias: ["Chicken", "Poultry"],
    expiration: "2022-09-15",
    notes: "Defrost in fridge, check expiration!",
    cost: 4.5,
  },
  {
    id: "e7e83489-c572-462b-814e-fc8919fcd027",
    name: "Rice",
    category: Categories[4],
    quantity: 450,
    unit: "grams",
    expiration: "2023-10-09",
    notes: "Left over good for fried rice.",
    cost: 1.18,
  },
  {
    id: "e3800f91-8e80-4a7d-a7c7-94b694a9c2b8",
    name: "Cola Drink",
    category: Categories[1],
    quantity: 11,
    // alias: ["Soft Drink", "Pop", "Cola"],
  },
  {
    id: "97718584-fcc6-47b6-a759-40d1280b10e2",
    name: "Salt",
    category: Categories[5],
    quantity: 50,
    unit: "grams",
    // alias: ["Sodium Chloride", "NaCL"],
    notes: "In spice cabinet",
    cost: 1.14,
  },
  {
    id: "0a39f31c-4359-4260-b8e5-4096880a179d",
    name: "Pepper",
    category: Categories[5],
    quantity: 25,
    unit: "grams",
    notes: "In spice cabinet",
    cost: 1.19,
  },
];

// 3 Entries
export const Recipes: Recipe[] = [
  {
    id: "1057ef23-fb9b-46db-8891-8b26d4d1e812",
    name: "Apple Potato Delight",
    ingredients: [Ingredients[0], Ingredients[1], Ingredients[3]],
    time: "10 Minutes",
    tags: [Tags[1], Tags[3]],
    steps: "Step 1 \n Step 2 \n Step 3",
  },
  {
    id: "eb0e5844-eb3e-4828-9e1b-71c9c84e6fab",
    name: "Spiced Cola Drink",
    ingredients: [Ingredients[5], Ingredients[6], Ingredients[7]],
    time: "10 Minutes",
    tags: [Tags[1]],
    steps: "Step 1: Mix all ingredients and enjoy!",
  },
  {
    id: "e2b54a37-64a3-4a0e-a86c-4294284a6244",
    name: "Spiced Fried Rice",
    ingredients: [Ingredients[4], Ingredients[6], Ingredients[7]],
    time: "25 Minutes",
    tags: [Tags[4], Tags[5], Tags[1], Tags[3]],
    steps: "Step 1: Use rice cooker \n Step 2: Fry rice",
  },
];
