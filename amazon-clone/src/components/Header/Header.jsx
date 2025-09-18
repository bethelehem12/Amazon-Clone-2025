import {useContext} from "react";
import USA from "../Carousel/img/USA.png";
import classes from "./Header.module.css";
import {Link} from "react-router-dom" //to prevent page refresh
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { reducer } from "../../utils/reducer";


const Header = () => {
  const [{basket}, dispatch] = useContext(DataContext)
  // show total number of items on cart
  const totalItem= basket?.reduce((amount,item)=>{
    return item.amount + amount
  }, 0)
  // console.log(basket.length)

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* logo container*/}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon header logo"
              />
            </Link>
            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <h6>Deliver to</h6>
                <span>USA</span>
              </div>
            </div>
          </div>
          {/* search section */}
          <div className={classes.search}>
            <select name="search-valet" id="search-valet">
              <option value="">All</option>
            </select>
            <input type="text" name="txt" id="txt" placeholder="search product" />
            <BsSearch size={25} />
          </div>

          {/* right side link */}
          <div className={classes.order_container}>
            <Link to="/" className={classes.language}>
              <img src={USA} alt="USA flag" />
              <select id="language" name="language" >
                <option value="EN"></option>
              </select>
            </Link>

            {/* three components */}
            <Link to="/auth">
              <h6 className={classes.smallTxt}> Sign In</h6>
              <span>Account & Lists</span>
            </Link>
            {/* orders */}
            <Link to="/orders">
              <h6 className={classes.smallTxt}>Returns</h6>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
