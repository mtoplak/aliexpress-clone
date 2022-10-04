import React from "react";
import { Link } from "react-router-dom";

function FeaturedProduct(props) {
  return (
    <>
      <div key={props.index} className="featured-product">
        <Link to={`/product/${props.product.productName}`}>
          <img
            className="featured"
            alt={props.product.productName}
            src={props.product.imageUrl}
          ></img>
          <figcaption
            style={{ fontWeight: "bold", fontSize: "12px", marginTop: "7px" }}
          >
            {props.product.productName}
          </figcaption>
        </Link>
      </div>
      {props.index === 3 && <br />}
    </>
  );
}

export default FeaturedProduct;
