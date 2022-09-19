import { useEffect, useState } from "react";
import {
  deleteObjectFromDb,
  getAllObjectsFromDb,
} from "../../../utils/storage";
import { Category } from "../../../utils/types";
import CategoryCard from "./components/CategoryCard";

function CategoryPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      setCategories((await getAllObjectsFromDb("category")) as Category[]);
    };
    getCategories().then(() => {
      setLoading(false);
    });
  }, []);

  function deleteCategory(category: Category) {
    deleteObjectFromDb(category.id, "category").then(() => {
      const tempList = [...categories];
      tempList.splice(tempList.indexOf(category), 1);
      setCategories(tempList);
    });
  }

  let categoryCards = categories.map((element, index) => {
    return (
      <div key={index} className={"sticky-width m-auto my-2"}>
        <CategoryCard
          key={index}
          category={element}
          deleteCategory={deleteCategory}
        />
      </div>
    );
  });

  if (loading) {
    return <div className={"m-8"}>loading...</div>;
  } else {
    return <div className={"m-8 mb-32"}>{categoryCards}</div>;
  }
}

export default CategoryPage;
