import { useEffect, useState } from "react";
import { deleteFromDb, getAllFromDb } from "../../../utils/storage/localStore";
import { Category } from "../../../utils/types";
import CategoryCard from "./components/CategoryCard";

function CategoryPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  // Get categories from Db on load
  useEffect(() => {
    const getCategories = async () => {
      setCategories((await getAllFromDb("category")) as Category[]);
    };
    getCategories().then(() => {
      setLoading(false);
    });
  }, []);

  // Delete categories from db and local state
  function deleteCategory(category: Category) {
    deleteFromDb(category.id, "category").then(() => {
      const tempList = [...categories];
      tempList.splice(tempList.indexOf(category), 1);
      setCategories(tempList);
    });
  }

  // Create category cards for each category
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
