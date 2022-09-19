import { Recipe } from "../../../../utils/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cupboardHasIngredients } from "../../../../utils/storage";
import ModalContainer from "../../../forms/components/ModalContainer";
import RecipeModal from "./RecipeModal";

const RecipeCard = (props: {
  recipe: Recipe;
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
  getRecipes: () => Promise<void>;
  handleDelete: (recipe: Recipe) => Promise<void>;
}): JSX.Element => {
  const [missingIngredients, setMissingIngredients] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpened] = useState(false);

  useEffect(() => {
    const getAsync = async () => {
      const temp = await cupboardHasIngredients(props.recipe);
      setMissingIngredients(temp);
    };
    setLoading(true);
    getAsync().then(() => {
      setLoading(false);
    });
  }, [props.recipe]);

  let className;
  let missing;
  if (missingIngredients === 0) {
    className = "p-4 rounded-3xl shadow-md bg-gray-200 aspect-square w-full";
  } else {
    className = "p-4 rounded-3xl shadow-md bg-red-200 aspect-square w-full";
    missing = (
      <div
        className={
          "absolute bottom-0 opacity-70 font-bold text-red-700 text-xs"
        }
      >
        Missing {missingIngredients} ingredient(s).
      </div>
    );
  }

  // function handleDelete() {
  //   deleteObjectFromDb(props.recipe.id, "recipe").then((r) => setOpened(false));
  // }

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
