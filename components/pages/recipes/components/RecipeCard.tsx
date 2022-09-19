import { Recipe } from "../../../../utils/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalContainer from "../../../forms/components/ModalContainer";
import RecipeModal from "./RecipeModal";
import { missingIngredients } from "../../../../utils/storage/data";

const RecipeCard = (props: {
  recipe: Recipe;
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
  getRecipes: () => Promise<void>;
  handleChange: (recipe: Recipe) => Promise<void>;
  handleDelete: (recipe: Recipe) => Promise<void>;
}): JSX.Element => {
  const [missingIngredientsInRecipe, setMissingIngredientsInRecipe] =
    useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpened] = useState(false);

  // Get missing ingredients and store in state
  useEffect(() => {
    const getMissingIngredients = async () => {
      const temp = await missingIngredients(props.recipe);
      setMissingIngredientsInRecipe(temp);
    };
    setLoading(true);
    getMissingIngredients().then(() => {
      setLoading(false);
    });
  }, [props.recipe]);

  // Change card to red if missing ingredients
  let className;
  let missing;
  if (missingIngredientsInRecipe === 0) {
    className = "p-4 rounded-3xl shadow-md bg-gray-200 aspect-square w-full";
  } else {
    className = "p-4 rounded-3xl shadow-md bg-red-200 aspect-square w-full";
    missing = (
      <div
        className={
          "absolute bottom-0 opacity-70 font-bold text-red-700 text-xs"
        }
      >
        Missing {missingIngredientsInRecipe} ingredient(s).
      </div>
    );
  }

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div className={"w-full h-full"}>
        <button
          className={className}
          onClick={() => {
            setOpened(true);
          }}
        >
          <div className={"w-full h-full flex justify-center"}>
            <div
              className={
                "relative flex flex-col justify-center items-center w-full"
              }
            >
              <div
                className={
                  "absolute top-0 right-0 text-xs opacity-70 font-mono"
                }
              >
                {props.recipe.time}
              </div>
              <div className={"text-3xl justify-center font-serif"}>
                {props.recipe.name}
              </div>
              {missing}
            </div>

            <ModalContainer
              open={open}
              setOpened={setOpened}
              onCloseAction={props.getRecipes}
              ModalContent={
                <RecipeModal
                  recipe={props.recipe}
                  handleDelete={props.handleDelete}
                  handleChange={props.handleChange}
                />
              }
            />
          </div>
        </button>
      </div>
    );
  }
};

export default RecipeCard;
