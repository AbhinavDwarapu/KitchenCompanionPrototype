// import React, { useState } from "react";
//
// import { Category, Ingredient, Tag } from "../../../utils/types";
// import { IoMdCreate } from "react-icons/io";
//
// const SearchInput = (props: {
//   id: string;
//   name: string;
//   objects: Ingredient[] | Tag[] | Category[];
//   dropdownElement: JSX.Element;
// }): JSX.Element => {
//   const [query, setQuery] = useState("");
//   const [chosenObjectsArray, setChosenObjectsArray] = useState<
//     Ingredient[] | Tag[] | Category[]
//   >([]);
//   const [focus, setFocused] = useState(false);
//
//   let dropdownObjects: JSX.Element[] = [];
//   let chosenObjects: JSX.Element[] = [];
//
//   // Filter categories based on query
//   let filteredObjects: Ingredient[] | Tag[] | Category[];
//   filteredObjects = props.objects.filter(
//     (object: Ingredient | Tag | Category) => {
//       return object.name
//         .toLowerCase()
//         .trim()
//         .includes(query.toLowerCase().trim());
//     }
//   );
//
//   // Create "fake" query to create a new Category outside of db
//   let exists = false;
//   if (query.length > 0) {
//     const newObject: Ingredient | Tag | Category = {
//       icon: 0,
//       id: "1",
//       name: (query.charAt(0).toUpperCase() + query.slice(1)).trim(),
//       quantity: 1,
//       categories: [],
//     };
//     if (filteredObjects.length > 0) {
//       for (let i = 0; i < filteredObjects.length; i++) {
//         if (
//           filteredObjects[i].name.toLowerCase() === newObject.name.toLowerCase()
//         ) {
//           exists = true;
//           break;
//         }
//       }
//       if (!exists) {
//         filteredObjects.unshift(newObject);
//       }
//     } else {
//       filteredObjects.unshift(newObject);
//     }
//   }
//
//   // Show categories to choose when input is focused
//   if (focus) {
//     for (let i = 0; i < filteredObjects.length; i++) {
//       if (chosenObjectsArray.includes(filteredObjects[i])) {
//         continue;
//       }
//       const colourClass = buttonClass(filteredObjects[i].colour);
//
//       if (i == 0 && query.length > 0 && !exists) {
//         dropdownIngredients.push(
//           <button
//             key={filteredObjects[i].id}
//             onClick={() => {
//               const temp = [...chosenObjectsArray];
//               temp.push(filteredObjects[i]);
//               setChosenObjectsArray([...temp]);
//             }}
//             className={colourClass}
//             type={"button"}
//           >
//             <IoMdCreate size={16} className={"flex mr-1 mt-1"} />
//             {filteredObjects[i].name}
//           </button>
//         );
//       } else {
//         dropdownIngredients.push(
//           <button
//             key={filteredObjects[i].id}
//             onClick={() => {
//               const temp = [...chosenObjectsArray];
//               temp.push(filteredObjects[i]);
//               setChosenObjectsArray([...temp]);
//             }}
//             className={colourClass}
//             type={"button"}
//           >
//             {filteredObjects[i].name}
//           </button>
//         );
//       }
//     }
//   }
//
//   // Create chosen categories button
//   chosenObjectsArray.map((ingredient) => {
//     const colourClass = buttonClass("ingredient");
//     chosenIngredients.push(
//       <button
//         key={ingredient.id}
//         onClick={() => {
//           const temp = [...chosenObjectsArray];
//           temp.indexOf(ingredient);
//           temp.splice(temp.indexOf(ingredient), 1);
//           setChosenObjectsArray([...temp]);
//         }}
//         className={colourClass}
//         type={"button"}
//       >
//         {ingredient.name}
//       </button>
//     );
//   });
//
//   return (
//     <div
//       className={"relative"}
//       onBlur={() => {
//         setTimeout(() => {
//           setFocused(false);
//         }, 200);
//       }}
//     >
//       <label className={"block w-full mb-4"}>{props.name}</label>
//       <input
//         type="text"
//         aria-label={props.name}
//         autoComplete="off"
//         onFocus={() => {
//           setFocused(true);
//         }}
//         className="w-full rounded-md py-2.5 px-3.5 text-gray-900 bg-gray-100 transition focus:bg-gray-200 focus:outline-none selection:bg-gray-400"
//         id={props.id}
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <div
//         className={
//           "w-full absolute overflow-y-auto max-h-30 flex flex-wrap mt-2 bg-pink-100 rounded-md transition-all"
//         }
//         onClick={() => {
//           setFocused(!focus);
//         }}
//       >
//         {dropdownIngredients}
//       </div>
//       <div
//         className={
//           "w-full overflow-y-auto max-h-24 flex flex-wrap mt-2 rounded-md transition-all"
//         }
//       >
//         {chosenIngredients}
//       </div>
//     </div>
//   );
// };
//
// function buttonClass(colour: string) {
//   switch (colour) {
//     default:
//       return "bg-gray-300 truncate p-2 m-2 rounded-md text-base flex flex-row justify-content";
//     case "red":
//       return "bg-red-300 truncate p-2 m-2 rounded-md text-base";
//     case "blue":
//       return "bg-blue-300 truncate p-2 m-2 rounded-md text-base";
//     case "green":
//       return "bg-green-300 truncate p-2 m-2 rounded-md text-base";
//   }
// }
//
// export default SearchInput;
export {};
