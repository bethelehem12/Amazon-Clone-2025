import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import {Link} from "react-router-dom"
const ProductCard = ({ product }) => {
  const { image, title, id, rating, price } = product;
  return (
    <div className={`${classes.card_container}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating.rate} precision={0.1} />
          {/* rating count */}
          <small>{rating.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {/* add to cart */}
        <button className={classes.button}>add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
