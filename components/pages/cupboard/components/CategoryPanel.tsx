import { Ingredient, Recipe } from "../../../../utils/types";
import CupboardCard from "./CupboardCard";

const CategoryPanel = (props: {
  category: string;
  ingredients: Ingredient[];
  handleDelete: (ingredient: Ingredient) => Promise<void>;
  handleChange: (ingredient: Ingredient) => Promise<void>;
}): JSX.Element => {
  let cupboardCards;

  // Array of cupboard cards in panel (category)
  cupboardCards = props.ingredients.map((value, index) => {
    return (
      <CupboardCard
        key={index}
        ingredient={value}
        handleDelete={props.handleDelete}
        handleChange={props.handleChange}
      />
    );
  });

  return (
    <div className={"my-1 p-4 rounded-lg"}>
      <div className=" border-t border-gray-300"></div>
      <div className={"text-4xl font-bold mt-4 mb-2 ml-1"}>
        {props.category}
      </div>
      <div className={"grid mini:grid-cols-1 sm:grid-cols-1 grid-cols-2 gap-2"}>
        {cupboardCards}
      </div>
    </div>
  );
};

export default CategoryPanel;
