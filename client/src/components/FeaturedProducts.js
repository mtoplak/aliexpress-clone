import React from "react";
import FeaturedProduct from "./FeaturedProduct";
import useFetchProducts from "./useFetchProducts";

const host = process.env.REACT_APP_API_URL;


function FeaturedProducts() {
  //const [products] = useFetchProducts(`${host}/products`);
  //console.log(products);
  const [products] = useFetchProducts(`${host}/products`);
  console.log(products);

  return (
    <React.Fragment>
      <div id="featured-products">
        Featured Products:
        <br />
        {products && products.slice(0, 8).map((product, index) => (
          <FeaturedProduct product={product} key={index} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default FeaturedProducts;
