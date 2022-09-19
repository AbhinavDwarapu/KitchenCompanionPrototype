import { useEffect, useRef, useState } from "react";
import { Category, Ingredient, Recipe, Tag } from "../../../utils/types";
import { getAllFromDb } from "../../../utils/storage/localStore";
import { initTempData } from "../../../utils/mock/mockData";

function DatabasePage(): JSX.Element {
  const recipes = useRef<Recipe[]>([]);
  const ingredients = useRef<Ingredient[]>([]);
  const categories = useRef<Category[]>([]);
  const tags = useRef<Tag[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStorage = async () => {
      await initTempData();
      recipes.current = (await getAllFromDb("recipe")) as Recipe[];
      ingredients.current = (await getAllFromDb("ingredient")) as Ingredient[];
      categories.current = (await getAllFromDb("category")) as Category[];
      tags.current = (await getAllFromDb("tag")) as Tag[];
    };
    setLoading(true);
    getStorage().then(() => {
      setLoading(false);
    });
  }, []);

  if (!loading) {
    return (
      <div className={"mb-32"}>
        <div>Debug Page!</div>
        <br />
        <b>Categories</b>
        <div>
          {categories.current.map((item, index) => {
            return (
              <>
                <div key={index}>
                  Number: {index}, <br />
                  ID: {item.id}, <br />
                  Name: {item.name}, <br />
                  Colour: {item.colour}
                </div>
                <br />
              </>
            );
          })}
        </div>
        <br />
        <b>Tags</b>
        <div>
          {tags.current.map((item, index) => {
            return (
              <>
                <div key={index}>
                  ID: {item.id}, <br />
                  Name: {item.name}, <br />
                  Colour: {item.colour}
                </div>
                <br />
              </>
            );
          })}
        </div>
        <br />
        <b>Ingredients</b>

        <br />
        <b>Recipes</b>
        <div>
          {recipes.current.map((item, index) => {
            return (
              <>
                <div key={index}>
                  id: {index}, {JSON.stringify(item, null, 4)}
                </div>
                <br />
              </>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default DatabasePage;
