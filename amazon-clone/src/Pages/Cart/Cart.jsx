import { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import { DataContext } from "../../components/DataProvider/DataProvider";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from './Cart.module.css'
const Cart = () => {
  const [{ basket }, dispatch] = useContext(DataContext);
// total
const total=basket.reduce((amount, item)=>{
 return item.price + amount
}, 0) //initially
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container }>
          <h2>Welcome</h2>
          <h3>Thank you for shopping on Amazon</h3>
          <hr />
          {basket?.length == 0 ? (
            <h3>Please add items to your cart 😊</h3>
          ) : (
            basket?.map((item, i) => {
              return (
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAddCart={false}
                  flex={true}
                />
              );
            })
          )}
        </div>
        {/* subtotal */}
        {basket?.length !== 0 && (
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
