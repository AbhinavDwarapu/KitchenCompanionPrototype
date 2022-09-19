import { Category, Ingredient, Recipe } from "../../../../utils/types";
import {
  addToDb,
  getByNameFromDb,
  getFromDb,
} from "../../../../utils/storage/localStore";
import React, { useEffect, useRef, useState } from "react";
import TextAreaInput from "../../../forms/components/inputs/TextAreaInput";
import TagsDropdown from "../../../forms/components/dropdowns/TagsDropdown";
import TextInput from "../../../forms/components/inputs/TextInput";
import NumberInput from "../../../forms/components/inputs/NumberInput";
import IngredientsDropdown from "../../../forms/components/dropdowns/IngredientsDropdown";
import toast, { Toaster } from "react-hot-toast";
import { RecipeSchema } from "../../../../utils/schema";

const RecipeModal = (props: {
  recipe: Recipe;
  handleDelete: (recipe: Recipe) => Promise<void>;
  handleChange: (recipe: Recipe) => Promise<void>;
}): JSX.Element => {
  // Open states
  const [openIngredients, setOpenIngredients] = useState(false);
  const [openTags, setOpenTags] = useState(false);

  // Local form states
  const [recipeName, setRecipeName] = useState(props.recipe.name);
  const [ingredients, setIngredients] = useState(
    props.recipe.ingredients ? props.recipe.ingredients : []
  );
  const [time, setTime] = useState(props.recipe.time ? props.recipe.time : "");
  const [tags, setTags] = useState(props.recipe.tags ? props.recipe.tags : []);
  const [steps, setSteps] = useState(
    props.recipe.steps ? props.recipe.steps : ""
  );

  // Title text ref
  const textRef = useRef<any>();
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "30px";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, []);

  async function schemaValidate(tempRecipe: Recipe) {
    const existingRecipe = (await getByNameFromDb(
      tempRecipe.name,
      "recipe"
    )) as Recipe;

    if (
      typeof existingRecipe !== "undefined" &&
      existingRecipe.id !== props.recipe.id
    ) {
      const notify = () => toast("Name already exists!");
      notify();
      return;
    }

    const message = RecipeSchema.safeParse(tempRecipe);
    if (message.success) {
      // TODO: Broken function, handle change loops forever.
      // await props.handleChange(tempRecipe);
      await addToDb(tempRecipe, "recipe").then(() => {});
    } else {
      console.log(message.error.issues);
      toast.dismiss();
      const notify = () => toast(message.error.issues[0].message);
      notify();
    }
  }

  useEffect(() => {
    const tempRecipe = { ...props.recipe };

    tempRecipe.name = recipeName;
    tempRecipe.ingredients = ingredients;
    tempRecipe.time = time;
    tempRecipe.tags = tags;
    tempRecipe.steps = steps;
    schemaValidate(tempRecipe);
  }, [ingredients, recipeName, steps, tags, time]);

  // Recipe tags array
  let tagsArray;
  if (tags) {
    tagsArray = tags.map((tag) => {
      return (
        <button
          key={tag.id}
          onClick={() => {
            if (openTags) {
              const tempTags = [...tags];
              tempTags.splice(tags.indexOf(tag), 1);
              setTags(tempTags);
            }
          }}
          className={
            "bg-gray-300 text-xs rounded-full p-2 shadow-md text-center m-1"
          }
        >
          {tag.id}
        </button>
      );
    });
  }

  // Recipe ingredients
  let ingredientsArray;
  if (ingredients) {
    ingredientsArray = ingredients.map((ingredient) => {
      return (
        <IngredientComponent
          key={ingredient.id}
          ingredient={ingredient}
          setIngredients={setIngredientsToState}
        />
      );
    });
  }

  function setIngredientsToState(ingredient: Ingredient) {
    const tempIngredients = [...ingredients];
    for (let i = 0; i < tempIngredients.length; i += 1) {
      if (tempIngredients[i].id === ingredient.id) {
        tempIngredients[i] = ingredient;
        setIngredients(tempIngredients);
        break;
      }
    }
  }

  return (
    <div>
      <Toaster />
      <div className={"flex flex-col w-full mt-12 justify-center items-center"}>
        <textarea
          ref={textRef}
          value={recipeName}
          className={
            "resize-none text-center text-7xl py-4 font-serif rounded-3xl w-full transition-all focus:mb-2 focus:bg-gray-200 focus:outline-none selection:bg-gray-400"
          }
          onChange={(e) => {
            setRecipeName(e.currentTarget.value);
          }}
        />
      </div>
      <div className={"flex flex-col items-center mt-4 mb-2 justify-center"}>
        <div className={"flex flex-row"}>{tagsArray}</div>

        <div className={"flex flex-col justify-center items-center p-1"}>
          <button
            className={
              "flex bg-green-200 rounded-full w-16 h-8 text-xs mt-2 text-center items-center justify-center shadow-md"
            }
            onClick={() => {
              setOpenTags(!openTags);
            }}
          >
            Edit
          </button>
          <div className={"relative"}>
            <TagsDropdown
              id={recipeName}
              tags={tags}
              setTags={setTags}
              open={openTags}
              setOpen={setOpenTags}
            />
          </div>
        </div>
      </div>
      <div className={"flex justify-center items-center rounded-full mt-8"}>
        <div className={"flex"}>
          <input
            type={"input"}
            className={
              "transition-all bg-gray-100 text-center shadow-md rounded-full p-4"
            }
            value={time}
            onChange={(e) => {
              setTime(e.currentTarget.value);
            }}
          />
        </div>
      </div>
      <div
        className={
          "relative bg-gray-50 rounded-xl py-4 px-4 mt-12 mb-2 justify-center"
        }
      >
        <div
          className={
            "flex justify-center -translate-y-8 font-serif text-xl mb-2  "
          }
        >
          <div className={"bg-gray-200 rounded-lg px-4 py-1 shadow-2xl"}>
            Ingredients
          </div>
        </div>

        <div className={"flex w-full"}>
          <div className={"table-row-group"}>{ingredientsArray}</div>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setOpenIngredients(!openIngredients);
          }}
          className={"w-full text-center h-12 rounded-lg bg-gray-100"}
        >
          New Ingredient
        </button>
        <IngredientsDropdown
          id={"IngredientsDropdown"}
          ingredients={ingredients}
          setIngredients={setIngredients}
          open={openIngredients}
          setOpen={setOpenIngredients}
        />
      </div>
      <div className={"mt-8 text-lg rounded-xl"}>
        <div className={"flex justify-center font-serif text-xl mb-2"}>
          <div className={"bg-gray-200 rounded-lg px-4 py-1 shadow-2xl"}>
            Steps
          </div>
        </div>
        <div className={"text-base mb-1"}>
          <TextAreaInput id={"steps"} text={steps} setText={setSteps} />
        </div>
      </div>
      <div className={"flex justify-center mt-16"}>
        <button
          className={"bg-red-100 text-red-800 rounded-full p-4"}
          onClick={() => {
            props.handleDelete(props.recipe);
          }}
        >
          Delete Recipe
        </button>
      </div>
    </div>
  );
};

const IngredientComponent = (props: {
  ingredient: Ingredient;
  setIngredients: (ingredient: Ingredient) => void;
}): JSX.Element => {
  const [cupboardIngredient, setCupboardIngredient] = useState<Ingredient>();
  const [quantity, setQuantity] = useState(props.ingredient.quantity);
  const [ingredientName, setIngredientName] = useState(props.ingredient.name);
  const [unit, setUnit] = useState(
    props.ingredient.unit ? props.ingredient.unit : "unit(s)"
  );

  // Get ingredient from db to compare quantities
  useEffect(() => {
    const getIngredient = async () => {
      setCupboardIngredient(
        (await getFromDb(props.ingredient.id, "ingredient")) as Ingredient
      );
    };

    getIngredient().then(() => {
      let tempIngredient: Ingredient;
      tempIngredient = props.ingredient;
      tempIngredient.name = ingredientName;
      tempIngredient.quantity = quantity;
      tempIngredient.unit = unit;
      tempIngredient.category = { id: "Misc." };
      props.setIngredients(tempIngredient);
    });
  }, [quantity, ingredientName, unit]);

  let missingQuantity = false;
  if (typeof cupboardIngredient !== "undefined") {
    if (cupboardIngredient?.quantity < props.ingredient.quantity) {
      missingQuantity = true;
    }
  }

  return (
    <div className={"flex flex-row justify-center items-center border-b my-2"}>
      <div className={"flex flex-col mb-4"}>
        <div className={"py-2"}>
          <NumberInput
            id={"quantity"}
            number={quantity}
            setNumber={setQuantity}
          />
        </div>
        <div className={""}>
          <TextInput text={unit} id={unit} setText={setUnit} />
        </div>
      </div>

      <div className={"flex text-right font-bold h-full"}>
        <TextAreaInput
          text={ingredientName}
          id={props.ingredient.name}
          setText={setIngredientName}
          red={missingQuantity}
        />
      </div>
    </div>
  );
};

export default RecipeModal;
