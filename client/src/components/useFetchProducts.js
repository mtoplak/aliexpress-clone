import { useState, useEffect } from "react";

const host = require('../constants').host;

const useFetchProducts = () => {
  const [products, setProducts] = useState(null);
  const url = host + "/products" ;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((products) => setProducts(products));
  }, [url]);

  return [products];
};

export default useFetchProducts;
