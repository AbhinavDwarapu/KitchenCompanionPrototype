import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Category } from "../../../../utils/types";
import { IoMdCreate } from "react-icons/io";
import { getAllFromDb } from "../../../../utils/storage/localStore";
import { generateId } from "../../../../utils/storage/data";

const CategoriesDropdown = (props: {
  id: string;
  category: Category;
  setCategory: Dispatch<SetStateAction<Category>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const [query, setQuery] = useState("");
  const [categoriesFromDb, setCategoriesFromDb] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const tempCategories = (await getAllFromDb("category")) as Category[];
      setCategoriesFromDb(tempCategories);
    };
    setLoading(true);
    getCategories().then(() => {
      setLoading(false);
    });
  }, []);

  // Filter categories based on query
  let filteredCategories: Category[] = [];
  if (!loading) {
    filteredCategories = categoriesFromDb.filter((category) => {
      return category.id
        .toLowerCase()
        .trim()
        .includes(query.toLowerCase().trim());
    });
  }

  // Create "fake" query to create a new Category outside of db
  let exists = false;
  if (query.length > 0) {
    const newCategory: Category = {
      id: (query.charAt(0).toUpperCase() + query.slice(1)).trim(),
      colour: "gray",
    };
    if (filteredCategories.length > 0) {
      for (let i = 0; i < filteredCategories.length; i++) {
        if (
          filteredCategories[i].id.toLowerCase() ===
          newCategory.id.toLowerCase()
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
  let dropdownCategories: JSX.Element[] = [];

  for (let i = 0; i < filteredCategories.length; i++) {
    const colourClass = "bg-gray-300 truncate p-2 m-2 rounded-md text-base";

    if (i == 0 && query.length > 0 && !exists) {
      dropdownCategories.push(
        <button
          key={filteredCategories[i].id}
          onClick={() => {
            props.setCategory(filteredCategories[i]);
          }}
          className={colourClass}
          type={"button"}
        >
          <IoMdCreate size={16} className={"flex mr-1 mt-1"} />
          {filteredCategories[i].id}
        </button>
      );
    } else {
      dropdownCategories.push(
        <button
          key={filteredCategories[i].id}
          onClick={() => {
            props.setCategory(filteredCategories[i]);
          }}
          className={colourClass}
          type={"button"}
        >
          {filteredCategories[i].id}
        </button>
      );
    }
  }

  // Create chosen categories button
  if (props.open && !loading) {
    return (
      <div
        className={"relative mt-2"}
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
            "w-full absolute overflow-y-auto max-h-30 flex flex-wrap mt-2 bg-pink-100 rounded-md transition-all"
          }
          onClick={() => {
            props.setOpen(!focus);
          }}
        >
          {dropdownCategories}
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

export default CategoriesDropdown;
