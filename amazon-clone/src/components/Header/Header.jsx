import {useContext} from "react";
import US from "../Carousel/img/US.png";
import classes from "./Header.module.css";
import {Link} from "react-router-dom" //to prevent page refresh
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";




const Header = () => {
  const [{basket}, dispatch] = useContext(DataContext);
  console.log(basket.length)
  return (
    <>
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
                <p>Deliver to</p>
                <span>USA</span>
              </div>
            </div>
          </div>
          {/* search section */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <BsSearch size={25} />
          </div>

          {/* right side link */}
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img src={US} alt="USA flag" />
              <select>
                <option value="EN"></option>
              </select>
            </Link>

            {/* three components */}

            <Link to="">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{basket.length}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header;
