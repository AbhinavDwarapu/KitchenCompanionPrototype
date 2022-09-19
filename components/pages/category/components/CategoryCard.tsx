import { Category } from "../../../../utils/types";

function CategoryCard(props: {
  category: Category;
  deleteCategory: (category: Category) => void;
}): JSX.Element {
  let containerColour = "";

  if (props.category) {
    switch (props.category.colour) {
      case "red":
        containerColour += " bg-red-200";
        break;
      case "blue":
        containerColour += " bg-blue-200";
        break;
      case "green":
        containerColour += " bg-green-200";
        break;
      default:
        containerColour += " bg-gray-200";
        break;
    }
  } else {
    containerColour += " bg-gray-200";
  }

  return (
    <div
      className={
        "flex text-2xl justify-between items-center rounded-xl px-2" +
        containerColour
      }
    >
      <div className={"px-2 py-3"}>{props.category.name}</div>
      <button
        className={
          "bg-red-600 text-red-100 text-white text-lg rounded-xl px-4 p-2 my-2 text-sm hover:bg-red-300 hover:text-black transition"
        }
        onClick={() => {
          props.deleteCategory(props.category);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default CategoryCard;
