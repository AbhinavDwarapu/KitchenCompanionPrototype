import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Category, Ingredient, Tag } from "../../../utils/types";
import { IoMdCreate } from "react-icons/io";
import {
  generateId,
  getAllObjectsFromDb,
  getObjectByNameFromDb,
  getObjectFromDb,
} from "../../../utils/storage";

const IngredientsDropdown = (props: {
  id: string;
  ingredients: Ingredient[];
  setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const [query, setQuery] = useState("");
  const [ingredientsFromDb, setIngredientsFromDb] = useState<Ingredient[]>([]);
  const [miscCategory, setMiscCategory] = useState<Category>({
    colour: "",
    id: "",
    name: "",
    reference: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getIngredients = async () => {
      const tempIngredients = (await getAllObjectsFromDb(
        "ingredient"
      )) as Ingredient[];
      setIngredientsFromDb(tempIngredients);
      const tempCategory = (await getObjectByNameFromDb(
        "Misc.",
        "category"
      )) as Category;
      setMiscCategory(tempCategory);
    };
    setLoading(true);
    getIngredients().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  // Filter categories based on query
  let filteredIngredients: Ingredient[] = [];
  if (!loading) {
    filteredIngredients = ingredientsFromDb.filter((ingredient) => {
      return ingredient.name
        .toLowerCase()
        .trim()
        .includes(query.toLowerCase().trim());
    });
  }

  filteredIngredients.forEach((ingredient) => {
    ingredient.quantity = 1;
  });

  // Create "fake" query to create a new Category outside of db
  let exists = false;
  if (query.length > 0) {
    const newIngredient: Ingredient = {
      category: miscCategory,
      quantity: 1,
      id: generateId(),
      name: (query.charAt(0).toUpperCase() + query.slice(1)).trim(),
    };
    if (filteredIngredients.length > 0) {
      for (let i = 0; i < filteredIngredients.length; i++) {
        if (
          filteredIngredients[i].name.toLowerCase() ===
          newIngredient.name.toLowerCase()
        ) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        filteredIngredients.unshift(newIngredient);
      }
    } else {
      filteredIngredients.unshift(newIngredient);
    }
  }

  // Show tags to choose when input is focused
  let dropDownIngredients: JSX.Element[] = [];
  for (let i = 0; i < filteredIngredients.length; i++) {
    if (props.ingredients.some(({ id }) => id === filteredIngredients[i].id)) {
      continue;
    }
    const colourClass =
      "bg-gray-300 truncate p-2 m-2 rounded-md text-base flex flex-row justify-content";

    if (i == 0 && query.length > 0 && !exists) {
      dropDownIngredients.push(
        <button
          key={filteredIngredients[i].id}
          onClick={() => {
            const tempIngredients = [...props.ingredients];
            tempIngredients.push(filteredIngredients[i]);
            props.setIngredients(tempIngredients);
          }}
          className={colourClass}
          type={"button"}
        >
          <IoMdCreate size={16} className={"flex mr-1 mt-1"} />
          {filteredIngredients[i].name}
        </button>
      );
    } else {
      dropDownIngredients.push(
        <button
          key={filteredIngredients[i].id}
          onClick={() => {
            const tempIngredients = [...props.ingredients];
            tempIngredients.push(filteredIngredients[i]);
            props.setIngredients(tempIngredients);
          }}
          className={colourClass}
          type={"button"}
        >
          {filteredIngredients[i].name}
        </button>
      );
    }
  }

  // Create chosen categories button
  if (props.open && !loading) {
    return (
      <div
        className={"relative mt-2 z-50 transition-all"}
        onBlur={() => {
          setTimeout(() => {
            props.setOpen(false);
          }, 200);
        }}
      >
        <input
          type="text"
          aria-label={props.id}
          autoComplete="off"
          placeholder={"Search"}
          onFocus={() => {
            props.setOpen(true);
          }}
          className="w-full rounded-md py-2.5 px-3.5 text-gray-900 bg-gray-100 transition focus:bg-gray-200 focus:outline-none selection:bg-gray-400"
          id={props.id}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className={
            "w-full mb-4 absolute overflow-y-auto max-h-30 flex flex-wrap mt-2 bg-gray-100 rounded-md transition-all"
          }
          onClick={() => {
            props.setOpen(!focus);
          }}
        >
          {dropDownIngredients}
        </div>
      </div>
    );
  } else if (props.open && loading) {
    return <div>loading...</div>;
  } else {
    return <div></div>;
  }
};

function buttonClass(colour: string) {
  switch (colour) {
    default:
      return "bg-gray-300 truncate p-2 m-2 rounded-md text-base flex flex-row justify-content";
    case "red":
      return "bg-red-300 truncate p-2 m-2 rounded-md text-base";
    case "blue":
      return "bg-blue-300 truncate p-2 m-2 rounded-md text-base";
    case "green":
      return "bg-green-300 truncate p-2 m-2 rounded-md text-base";
  }
}

export default IngredientsDropdown;
