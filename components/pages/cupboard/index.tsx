import { useEffect, useState } from "react";
import { Category, Ingredient } from "../../../utils/types";
import {
  addObjectToDb,
  deleteObjectFromDb,
  generateId,
  getAllObjectsFromDb,
  getIngredientsByCategory,
  getObjectByNameFromDb,
  getOrderedCategoryKeys,
} from "../../../utils/storage";
import CategoryPanel from "./components/CategoryPanel";

function CupboardPage(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [sortedIngredients, setSortedIngredients] = useState<{
    [p: string]: Ingredient[];
  }>({});

  useEffect(() => {
    const getAndSortIngredients = async () => {
      const tempIngredients = (await getAllObjectsFromDb(
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

  async function handleDelete(ingredient: Ingredient) {
    await deleteObjectFromDb(ingredient.id, "ingredient").then(() => {
      const temp = [...ingredients];
      temp.splice(ingredients.indexOf(ingredient), 1);
      setIngredients(temp);
      setSortedIngredients(getIngredientsByCategory(temp));
    });
  }

  async function handleChange(ingredient: Ingredient) {
    const temp = [...ingredients];

    for (let i = 0; i < temp.length; i += 1) {
      if (temp[i].id === ingredient.id) {
        temp[i] = ingredient;
      }
    }
    setIngredients(temp);
    setSortedIngredients(getIngredientsByCategory(temp));

    await addObjectToDb(ingredient, "ingredient").then(() => {});
  }

  async function createIngredient() {
    const tempIngredients = [...ingredients];
    const tempCategory = (await getObjectByNameFromDb(
      "Misc.",
      "category"
    )) as Category;
    console.log();

    const tempIngredient: Ingredient = {
      category: tempCategory,
      id: generateId(),
      name: "New Ingredient " + Math.floor(Math.random() * 10000).toString(),
      quantity: 0,
    };
    console.log(tempIngredients);
    tempIngredients.unshift(tempIngredient);
    setIngredients(tempIngredients);
    setSortedIngredients(getIngredientsByCategory(tempIngredients));

    const temp = await addObjectToDb(tempIngredient, "ingredient").then(
      () => {}
    );
  }

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
            "p-2 rounded-lg shadow-lg bg-green-300 text-green-900 mx-4 mt-6 text-center"
          }
          onClick={() => {
            createIngredient();
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
