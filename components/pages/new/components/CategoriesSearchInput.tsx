import React, { Dispatch, SetStateAction, useState } from "react";

import { Category } from "../../../../utils/types";
import { IoMdCreate } from "react-icons/io";

const CategoriesSearchInput = (props: {
  id: string;
  name: string;
  categories: Category[];
  chosenCategoriesArray: Category[];
  setChosenCategoriesArray: Dispatch<SetStateAction<Category[]>>;
}): JSX.Element => {
  const [query, setQuery] = useState("");
  const [focus, setFocused] = useState(false);

  let dropdownCategories: JSX.Element[] = [];
  let chosenCategories: JSX.Element[] = [];

  // Filter categories based on query
  let filteredCategories: Category[];
  filteredCategories = props.categories.filter((category) => {
    return category.name
      .toLowerCase()
      .trim()
      .includes(query.toLowerCase().trim());
  });

  // Create "fake" query to create a new Category outside of db
  let exists = false;
  if (query.length > 0) {
    const newCategory: Category = {
      id: "1",
      name: (query.charAt(0).toUpperCase() + query.slice(1)).trim(),
      colour: "gray",
      reference: [],
    };
    if (filteredCategories.length > 0) {
      for (let i = 0; i < filteredCategories.length; i++) {
        if (
          filteredCategories[i].name.toLowerCase() ===
          newCategory.name.toLowerCase()
        ) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        filteredCategories.unshift(newCategory);
      }
    } else {
      filteredCategories.unshift(newCategory);
    }
  }

  // Show categories to choose when input is focused
  if (focus) {
    for (let i = 0; i < filteredCategories.length; i++) {
      if (props.chosenCategoriesArray.includes(filteredCategories[i])) {
        continue;
      }
      const colourClass = buttonClass(filteredCategories[i].colour);

      if (i == 0 && query.length > 0 && !exists) {
        dropdownCategories.push(
          <button
            key={filteredCategories[i].id}
            onClick={() => {
              const temp = [...props.chosenCategoriesArray];
              temp.push(filteredCategories[i]);
              props.setChosenCategoriesArray([...temp]);
            }}
            className={colourClass}
            type={"button"}
          >
            <IoMdCreate size={16} className={"flex mr-1 mt-1"} />
            {filteredCategories[i].name}
          </button>
        );
      } else {
        dropdownCategories.push(
          <button
            key={filteredCategories[i].id}
            onClick={() => {
              const temp = [...props.chosenCategoriesArray];
              temp.push(filteredCategories[i]);
              props.setChosenCategoriesArray([...temp]);
            }}
            className={colourClass}
            type={"button"}
          >
            {filteredCategories[i].name}
          </button>
        );
      }
    }
  }

  // Create chosen categories button
  props.chosenCategoriesArray.map((category) => {
    const colourClass = buttonClass(category.colour);
    chosenCategories.push(
      <button
        key={category.id}
        onClick={() => {
          const temp = [...props.chosenCategoriesArray];
          temp.indexOf(category);
          temp.splice(temp.indexOf(category), 1);
          props.setChosenCategoriesArray([...temp]);
        }}
        className={colourClass}
        type={"button"}
      >
        {category.name}
      </button>
    );
  });

  return (
    <div
      className={"relative"}
      onBlur={() => {
        setTimeout(() => {
          setFocused(false);
        }, 200);
      }}
    >
      <label className={"block w-full mb-4"}>{props.name}</label>
      <input
        type="text"
        aria-label={props.name}
        autoComplete="off"
        onFocus={() => {
          setFocused(true);
        }}
        className="w-full rounded-md py-2.5 px-3.5 text-gray-900 bg-gray-100 transition focus:bg-gray-200 focus:outline-none selection:bg-gray-400"
        id={props.id}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div
        className={
          "w-full absolute overflow-y-auto max-h-30 flex flex-wrap mt-2 bg-pink-100 rounded-md transition-all"
        }
        onClick={() => {
          setFocused(!focus);
        }}
      >
        {dropdownCategories}
      </div>
      <div
        className={
          "w-full overflow-y-auto max-h-24 flex flex-wrap mt-2 rounded-md transition-all"
        }
      >
        {chosenCategories}
      </div>
    </div>
  );
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

export default CategoriesSearchInput;
