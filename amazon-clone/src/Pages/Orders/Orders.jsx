import { useContext, useState, useEffect } from "react";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./Orders.module.css";
import { db } from "../../utils/firebase";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {

    if (!user) {
      setOrders([]);
      return;
    }

    // user's orders collection
    const ordersRef = collection(db, "users", user.uid, "orders");

    // order query in descending:
    const q = query(ordersRef, orderBy("created", "desc"));
    //
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("QuerySnapshot:", snapshot);
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log("Orders:", ordersData);
      setOrders(ordersData);
    });

    //
    return () => unsubscribe();
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {/* empty order msg */}
          {orders?.length == 0 && (
            <div style={{padding: "20px"}}>There are no orders placed at the moment </div>
          )}
          {/* Ordered items */}
          <div>
            {orders?.map((eachOrder) => {
              return (
                <div key={eachOrder.id}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  {eachOrder.data.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
