import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Category, Tag } from "../../../utils/types";
import { IoMdCreate } from "react-icons/io";
import { generateId, getAllObjectsFromDb } from "../../../utils/storage";

const TagsDropdown = (props: {
  id: string;
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const [query, setQuery] = useState("");
  const [tagsFromDb, setTagsFromDb] = useState<Tag[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTags = async () => {
      const tempTags = (await getAllObjectsFromDb("tag")) as Tag[];
      setTagsFromDb(tempTags);
    };
    setLoading(true);
    getTags().then(() => {
      setLoading(false);
    });
  }, []);

  // Filter categories based on query
  let filteredTags: Tag[] = [];
  if (!loading) {
    filteredTags = tagsFromDb.filter((tag, index) => {
      return tag.name.toLowerCase().trim().includes(query.toLowerCase().trim());
    });
  }

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

  // Show tags to choose when input is focused
  let dropdownTags: JSX.Element[] = [];
  for (let i = 0; i < filteredTags.length; i++) {
    if (props.tags.some(({ id }) => id === filteredTags[i].id)) {
      continue;
    }
    const colourClass = buttonClass(filteredTags[i].colour);

    if (i == 0 && query.length > 0 && !exists) {
      dropdownTags.push(
        <button
          key={filteredTags[i].id}
          onClick={() => {
            const tempTags = [...props.tags];
            tempTags.push(filteredTags[i]);
            props.setTags(tempTags);
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
            const tempTags = [...props.tags];
            tempTags.push(filteredTags[i]);
            props.setTags(tempTags);
          }}
          className={colourClass}
          type={"button"}
        >
          {filteredTags[i].name}
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
          {dropdownTags}
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

export default TagsDropdown;
