import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { getAllFromDb } from "../../utils/storage/localStore";
import { Category } from "../../utils/types";
import CategoryPage from "../../components/pages/category";

const CategoryIndex: NextPage = () => {
  return <CategoryPage />;
};

export default CategoryIndex;
