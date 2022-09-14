import { useState, useEffect } from "react";

const useFetchProductsFromCategory = (url) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(function(products){
        for(let i = 0; i < products.length; i++) {
          products[i].price = products[i].price.toString().replace('.', ',');
        } 
        setProducts(products);
      });
  }, [url]);
  return [products];
};

export default useFetchProductsFromCategory;
