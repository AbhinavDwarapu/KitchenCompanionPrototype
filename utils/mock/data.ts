import { Category, Ingredient, Recipe, Tag } from "../types";
import { addObjectToDb, clearDbs } from "../storage";

export async function initTempData() {
  // await clearDbs();

  for (let i = 0; i < Categories.length; i += 1) {
    await addObjectToDb(Categories[i], "category");
  }
  // for (let i = 0; i < Tags.length; i += 1) {
  //   await addObjectToDb(Tags[i], "tag");
  // }
  // for (let i = 0; i < Ingredients.length; i += 1) {
  //   await addObjectToDb(Ingredients[i], "ingredient");
  // }
  // for (let i = 0; i < Recipes.length; i += 1) {
  //   await addObjectToDb(Recipes[i], "recipe");
  // }
}

// 6 Entries
export const Categories: Category[] = [
  // {
  //   id: "8639e2c5-455d-4f34-8b93-ab3425068780",
  //   name: "Meats",
  //   colour: "red",
  //   reference: [],
  // },
  // {
  //   id: "a12d7447-22ec-4291-91d4-4f39de7c0ba3",
  //   name: "Drinks",
  //   colour: "green",
  //   reference: [],
  // },
  // {
  //   id: "41ec5211-b227-4450-b001-6aeea5666c3a",
  //   name: "Fruits",
  //   colour: "green",
  //   reference: [],
  // },
  // {
  //   id: "dd46c649-e5a9-42a5-8aa8-583f513f2b40",
  //   name: "Vegetables",
  //   colour: "blue",
  //   reference: [],
  // },
  {
    id: "3fb88781-22df-41a2-bf9b-87075acb666e",
    name: "Misc.",
    colour: "blue",
    reference: [],
  },
  // {
  //   id: "32912e95-62a3-41db-8287-b17c1406e937",
  //   name: "Spices",
  //   colour: "red",
  //   reference: [],
  // },
];

// 6 Entries
export const Tags: Tag[] = [
  {
    id: "bd0503b3-5d14-41f7-862d-f76d50b88a08",
    name: "Vegan",
    colour: "red",
    reference: [],
  },
  {
    id: "cfa47715-441e-4439-b83e-2174f41a5cb1",
    name: "Easy",
    colour: "blue",
    reference: [],
  },
  {
    id: "a32c58ff-ce3c-463c-be3f-3aa8ce4881d6",
    name: "Quick",
    colour: "gray",
    reference: [],
  },
  {
    id: "76a89eef-5e2f-45b1-b9d5-604b5ac73fd7",
    name: "Week Days",
    colour: "green",
    reference: [],
  },
  {
    id: "8605b434-bb77-4dba-be32-d5d9b61aedd3",
    name: "To Share",
    colour: "red",
    reference: [],
  },
  {
    id: "176f4ce9-533f-4452-b1a6-f2415c7de1bf",
    name: "Fancy",
    colour: "blue",
    reference: [],
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
    alias: ["potatoes", "pomme de terre"],
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
    alias: ["Pizza"],
    expiration: "2023-10-09",
    cost: 2.3,
  },
  {
    id: "5586072b-db10-48b9-b51a-18f7de24cdd2",
    name: "Chicken Breast",
    category: Categories[0],
    quantity: 4,
    unit: "pieces",
    alias: ["Chicken", "Poultry"],
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
    alias: ["Soft Drink", "Pop", "Cola"],
  },
  {
    id: "97718584-fcc6-47b6-a759-40d1280b10e2",
    name: "Salt",
    category: Categories[5],
    quantity: 50,
    unit: "grams",
    alias: ["Sodium Chloride", "NaCL"],
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
