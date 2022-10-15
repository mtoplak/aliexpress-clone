import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const host = require("../constants").host;

const useFetchProductsFromCategory = (category) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const url = host + "/c/" + category;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(function (products) {
        for (let i = 0; i < products.length; i++) {
          products[i].price = products[i].price.toString().replace(".", ",");
        }
        setProducts(products);
        if (products.length === 0) {
          navigate("/404", { replace: true });
        }
      });
  }, [url, navigate]);
  return [products];
};

export default useFetchProductsFromCategory;
