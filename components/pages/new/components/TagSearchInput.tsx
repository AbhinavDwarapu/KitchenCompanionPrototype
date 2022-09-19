import React, { Dispatch, SetStateAction, useState } from "react";

import { Category, Ingredient, Tag } from "../../../../utils/types";
import { IoMdCreate } from "react-icons/io";
import { generateId } from "../../../../utils/storage";

const TagsSearchInput = (props: {
  id: string;
  name: string;
  tags: Tag[];
  chosenTagsArray: Tag[];
  setChosenTagsArray: Dispatch<SetStateAction<Tag[]>>;
}): JSX.Element => {
  const [query, setQuery] = useState("");
  const [focus, setFocused] = useState(false);

  let dropdownTags: JSX.Element[] = [];
  let chosenTags: JSX.Element[] = [];

  // Filter categories based on query
  let filteredTags: Tag[];
  filteredTags = props.tags.filter((tag) => {
    return tag.name.toLowerCase().trim().includes(query.toLowerCase().trim());
  });

  // Create "fake" query to create a new Category outside of db
  let exists = false;
  if (query.length > 0) {
    const newTag: Tag = {
      id: generateId(),
      name: (query.charAt(0).toUpperCase() + query.slice(1)).trim(),
      colour: "gray",
      reference: [],
    };
    if (filteredTags.length > 0) {
      for (let i = 0; i < filteredTags.length; i++) {
        if (filteredTags[i].name.toLowerCase() === newTag.name.toLowerCase()) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        filteredTags.unshift(newTag);
      }
    } else {
      filteredTags.unshift(newTag);
    }
  }

  // Show categories to choose when input is focused
  if (focus) {
    for (let i = 0; i < filteredTags.length; i++) {
      if (props.chosenTagsArray.includes(filteredTags[i])) {
        continue;
      }
      const colourClass = buttonClass(filteredTags[i].colour);

      if (i == 0 && query.length > 0 && !exists) {
        dropdownTags.push(
          <button
            key={filteredTags[i].id}
            onClick={() => {
              const temp = [...props.chosenTagsArray];
              temp.push(filteredTags[i]);
              props.setChosenTagsArray([...temp]);
            }}
            className={colourClass}
            type={"button"}
          >
            <IoMdCreate size={16} className={"flex mr-1 mt-1"} />
            {filteredTags[i].name}
          </button>
        );
      } else {
        dropdownTags.push(
          <button
            key={filteredTags[i].id}
            onClick={() => {
              const temp = [...props.chosenTagsArray];
              temp.push(filteredTags[i]);
              props.setChosenTagsArray([...temp]);
            }}
            className={colourClass}
            type={"button"}
          >
            {filteredTags[i].name}
          </button>
        );
      }
    }
  }

  // Create chosen categories button
  props.chosenTagsArray.map((tag) => {
    const colourClass = buttonClass(tag.colour);
    chosenTags.push(
      <button
        key={tag.id}
        onClick={() => {
          const temp = [...props.chosenTagsArray];
          temp.indexOf(tag);
          temp.splice(temp.indexOf(tag), 1);
          props.setChosenTagsArray([...temp]);
        }}
        className={colourClass}
        type={"button"}
      >
        {tag.name}
      </button>
    );
  });

  return (
    <div
      className={"relative z-10"}
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
        {dropdownTags}
      </div>
      <div
        className={
          "w-full overflow-y-auto max-h-24 flex flex-wrap mt-2 rounded-md transition-all"
        }
      >
        {chosenTags}
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

export default TagsSearchInput;
