import React from "react";
import { categoryImgInfos } from "./categoryInfo";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";
const Category = () => {
  console.log(categoryImgInfos.length);
  return (
    <section className={classes.category_container}>
      {categoryImgInfos?.map((infos) => (
        <CategoryCard key={infos.name} data={infos} />
      ))}
    </section>
  );
};

export default Category;
