

import React, { useEffect, useState } from "react";
import classes from "./Category.module.css";
import {Link} from "react-router-dom"
const CategoryCard = ({ data }) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(data.imgLink);
        const products = await res.json();
        setImg(products[2]?.image); // display the third product image
      } catch (err) {
        console.error(err);
      }
    };

    fetchImage();
  }, [data.imgLink]);

  return (
    <>
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={img} alt={data.title} />
        <p>Shop Now</p>
      </Link>
    </div>
    </>
  );
};

export default CategoryCard;
