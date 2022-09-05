import React from "react";

function FeaturedProduct(props) {
  console.log(props);

  return (
    <React.Fragment>
      <div key={props.index} className="featured-product">
        <img
          className="featured"
          alt={props.product.productName}
          src={props.product.imageUrl}
        ></img>
        <br />
        <span style={{ fontWeight: "bold", fontSize: "12px" }}>
          {props.product.productName}
        </span>
      </div>
      {/* you can instead use: 
     {props.index === 1 && <div>
          <br />
        </div> }*/}
      {props.index === 1 ? (
        <div>
          <br />
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

export default FeaturedProduct;
