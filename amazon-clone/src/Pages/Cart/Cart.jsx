import { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import { DataContext } from "../../components/DataProvider/DataProvider";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from './Cart.module.css'
import { Type } from "../../utils/action.type";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';


const Cart = () => {
  const [{ basket }, dispatch] = useContext(DataContext);
// total
const total=basket.reduce((amount, item)=>{
 return item.price * item.amount + amount
}, 0) //initially


// increment and decrement
const increment =(item)=>{
  dispatch({
    type:Type.ADD_TO_BASKET,
    item
  });
}
const decrement =(id) =>{
  dispatch ({
    type:Type.REMOVE_FROM_BASKET,
    id
  })
}


  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container }>
          <h2>Welcome</h2>
          <h3>Thank you for shopping on Amazon</h3>
          <hr />
          {basket?.length === 0 ? (
            <h3>Please add items to your cart 😊</h3>
          ) : (
            basket?.map((item) => {
              return (
                // not child but the outermost element returned by map should have a unique key
                <section key={item.id} className={classes.cart_product}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    renderAddCart={false}
                    flex={true}
                  />
                  <div className={classes.btn_container}>
                    <button onClick={() => increment(item)}>
                      <AddBoxIcon />
                    </button>
                    <span>{item.amount}</span>
                    <button onClick={() => decrement(item.id)}>
                      <DeleteForeverIcon />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {/* subtotal */}
        {basket?.length > 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift 🎁</small>
            </span>
            <Link to="/payments">Continue to Checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;
