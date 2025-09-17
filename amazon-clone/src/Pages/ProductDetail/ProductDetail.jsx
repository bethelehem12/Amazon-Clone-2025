import { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  // console.log(productId);
  useEffect(() => {
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <LayOut>
      {/* Wait until product is loaded */}
      {product.id ? <ProductCard product={product} /> : <p>Loading...</p>}
    </LayOut>
  );
};

export default ProductDetail;
