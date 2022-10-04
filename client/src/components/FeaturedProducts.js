import React from "react";
import FeaturedProduct from "./FeaturedProduct";
import useFetchProducts from "./useFetchProducts";

const host = require('../constants').host;


function FeaturedProducts() {
  const [products] = useFetchProducts(`${host}/products`);

  return (
      <div id="featured-products">
        Featured Products:
        <br />
        {products && products.slice(0, 8).map((product, index) => (
          <FeaturedProduct product={product} key={index} />
        ))}
      </div>
  );
}

export default FeaturedProducts;
