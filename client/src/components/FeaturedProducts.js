import React from "react";
import FeaturedProduct from "./FeaturedProduct";

function FeaturedProducts(props) {
  return (
    <React.Fragment>
      <div id="featured-products">
        Featured Products:
        <br />
        {props.products.slice(0, 5).map((product, index) => (
          <FeaturedProduct product={product} index={index} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default FeaturedProducts;
