import { useEffect, useState } from "react";
import { Recipe } from "../../../utils/types";
import {
  addObjectToDb,
  deleteObjectFromDb,
  generateId,
  getAllObjectsFromDb,
} from "../../../utils/storage";
import RecipeCard from "./components/RecipeCard";

const RecipesIndex = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    setRecipes((await getAllObjectsFromDb("recipe")) as Recipe[]);
  };
  useEffect(() => {
    setLoading(true);
    getRecipes().then(() => {
      setLoading(false);
    });
  }, []);

  async function handleDelete(recipe: Recipe) {
    await deleteObjectFromDb(recipe.id, "recipe").then(() => {
      const temp = [...recipes];
      temp.splice(recipes.indexOf(recipe), 1);
      setRecipes([...temp]);
    });
  }

  async function createRecipe() {
    const tempRecipes = [...recipes];

    const tempRecipe: Recipe = {
      id: generateId(),
      name: "New Recipe " + Math.floor(Math.random() * 10000).toString(),
    };

    tempRecipes.unshift(tempRecipe);
    setRecipes(tempRecipes);

    await addObjectToDb(tempRecipe, "recipe").then(() => {});
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
