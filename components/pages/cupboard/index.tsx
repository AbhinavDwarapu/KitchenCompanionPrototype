import { useEffect, useState } from "react";
import { Ingredient } from "../../../utils/types";
import {
  addToDb,
  deleteFromDb,
  getAllFromDb,
  getIngredientsByCategory,
} from "../../../utils/storage/localStore";
import CategoryPanel from "./components/CategoryPanel";
import {
  generateId,
  getOrderedCategoryKeys,
} from "../../../utils/storage/data";

function CupboardPage(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [sortedIngredients, setSortedIngredients] = useState<{
    [p: string]: Ingredient[];
  }>({});

  // Get all ingredients sorted ingredients from Db
  useEffect(() => {
    const getAndSortIngredients = async () => {
      const tempIngredients = (await getAllFromDb(
        "ingredient"
      )) as Ingredient[];
      setIngredients(tempIngredients);
      setSortedIngredients(getIngredientsByCategory(tempIngredients));
    };
    setLoading(true);
    getAndSortIngredients().then(() => {
      setLoading(false);
    });
  }, []);

  // Delete ingredient from db and local state
  async function handleDelete(ingredient: Ingredient) {
    const temp = [...ingredients];
    temp.splice(ingredients.indexOf(ingredient), 1);
    setIngredients(temp);
    setSortedIngredients(getIngredientsByCategory(temp));
    await deleteFromDb(ingredient.id, "ingredient");
  }

  // Change ingredient from db and local state
  async function handleChange(ingredient: Ingredient) {
    const tempIngredients = [...ingredients];

    for (let i = 0; i < tempIngredients.length; i += 1) {
      if (tempIngredients[i].id === ingredient.id) {
        tempIngredients[i] = ingredient;
      }
    }
    setIngredients(tempIngredients);
    setSortedIngredients(getIngredientsByCategory(tempIngredients));

    await addToDb(ingredient, "ingredient");
  }

  // Create empty ingredient on new ingredient button, add to db and local state
  async function createEmptyIngredient() {
    const tempIngredients = [...ingredients];

    const tempIngredient: Ingredient = {
      category: { id: "Misc." },
      id: generateId(),
      name: "New Ingredient " + Math.floor(Math.random() * 10000).toString(),
      quantity: 0,
    };
    tempIngredients.unshift(tempIngredient);
    setIngredients(tempIngredients);
    setSortedIngredients(getIngredientsByCategory(tempIngredients));

    await addToDb(tempIngredient, "ingredient");
  }

  // Create category panels
  let combinedCategoryPanels: JSX.Element[] = [];
  if (loading) {
    return <div className={"m-8"}>loading...</div>;
  } else {
    const keys = getOrderedCategoryKeys(sortedIngredients);
    for (let i = 0; i < keys.length; i += 1) {
      combinedCategoryPanels.push(
        <CategoryPanel
          key={i}
          category={keys[i]}
          ingredients={sortedIngredients[keys[i]]}
          handleDelete={handleDelete}
          handleChange={handleChange}
        />
      );
    }

    return (
      <div className={"flex flex-col m-8 mb-32 sticky-width m-auto"}>
        <button
          className={
            "p-2 rounded-lg shadow-md bg-green-300 text-green-900 mx-4 mt-6 text-center"
          }
          onClick={() => {
            createEmptyIngredient();
          }}
        >
          New Ingredient?
        </button>
        {combinedCategoryPanels}
      </div>
    );
  }
}

export default CupboardPage;
