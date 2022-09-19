import { useEffect, useState } from "react";
import { Recipe } from "../../../utils/types";
import {
  addToDb,
  deleteFromDb,
  getAllFromDb,
} from "../../../utils/storage/localStore";
import RecipeCard from "./components/RecipeCard";
import { generateId } from "../../../utils/storage/data";

const RecipesIndex = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Get recipes from db and set to local state
  const getRecipes = async () => {
    setRecipes((await getAllFromDb("recipe")) as Recipe[]);
  };
  useEffect(() => {
    setLoading(true);
    getRecipes().then(() => {
      setLoading(false);
    });
  }, []);

  // Delete recipe from db and state
  async function handleDelete(recipe: Recipe) {
    const temp = [...recipes];
    temp.splice(recipes.indexOf(recipe), 1);
    setRecipes([...temp]);
    await deleteFromDb(recipe.id, "recipe");
  }

  // Change recipe in db and state
  // TODO: Broken function, handle change loops forever.
  async function handleChange(recipe: Recipe) {
    await addToDb(recipe, "recipe");
    const tempRecipes = [...recipes];
    for (let i = 0; i < tempRecipes.length; i += 1) {
      if (tempRecipes[i].id === recipe.id) {
        tempRecipes[i] = recipe;
      }
    }
    setRecipes([...tempRecipes]);
  }

  // Create empty recipe, add to db and local state
  async function createRecipe() {
    const tempRecipes = [...recipes];

    const tempRecipe: Recipe = {
      id: generateId(),
      name: "New Recipe " + Math.floor(Math.random() * 10000).toString(),
    };

    tempRecipes.unshift(tempRecipe);
    setRecipes(tempRecipes);

    await addToDb(tempRecipe, "recipe");
  }

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div className={"m-4 mb-16"}>
        <div className="grid grid-cols-1 mini:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 min-lg:grid-cols-6  justify-center gap-2">
          {recipes.map((recipe, index) => {
            return (
              <RecipeCard
                key={index}
                recipe={recipe}
                getRecipes={getRecipes}
                setRecipes={setRecipes}
                handleChange={handleChange}
                handleDelete={handleDelete}
              />
            );
          })}
          <div>
            <button
              onClick={() => {
                createRecipe();
              }}
              className={
                "w-full h-full flex justify-center items-center bg-green-300 rounded-2xl shadow-md aspect-square"
              }
            >
              <div
                className={
                  "relative flex flex-col justify-center items-center w-full"
                }
              >
                <div className={"text-3xl justify-center font-serif"}>
                  New Recipe?
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default RecipesIndex;
