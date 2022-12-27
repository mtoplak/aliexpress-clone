import { useState, useEffect } from "react";

const useFetchOneProduct = (url) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(function (product) {
        product.price = product.price.toString();
        product.price = product.price.replace(".", ",");
        if (product.price.split(",")[1].length === 1) {
          product.price = product.price + "0";
        }
        setProduct(product);
      });
  }, [url]);
  return [product];
};

export default useFetchOneProduct;
