import React from "react";
import FeaturedProduct from "./FeaturedProduct";
import useFetchProducts from "./useFetchProducts";


function FeaturedProducts() {
  const [products] = useFetchProducts();

  return (
      <div id="featured-products">
        Featured Products:
        <br />
        {products && products.slice(0, 8).map((product, index) => (
          <FeaturedProduct product={product} key={index} breakLine={index}/>
        ))}
      </div>
  );
}

export default FeaturedProducts;
