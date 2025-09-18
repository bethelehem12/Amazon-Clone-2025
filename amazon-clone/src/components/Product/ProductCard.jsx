import { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../utils/action.type"; 

const ProductCard = ({ product, flex, renderDesc }) => {
  const { image, title, id, rating, price, description } = product;
const [state, dispatch]=useContext(DataContext)
// console.log(state);
const addToCart=() =>{
  dispatch({
    type:Type.ADD_TO_BASKET, 
    item:{
      image, title, id, rating, price, description 

    }
  })
}

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.products_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ width: "800px" }}>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* rating count */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {/* add to cart */}
        <button className={classes.button} onClick={addToCart}>add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
