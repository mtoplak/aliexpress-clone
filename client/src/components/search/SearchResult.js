import React from "react";
import { Link } from "react-router-dom";

function SearchResult(props) {
  const product = props.product;
  const breakLine = props.breakLine;
  return (
    <>
      <div className="search-result">
        <Link to={`/product/${product.productName}`}>
          <img
            className="image-results"
            src={product.imageUrl}
            alt={product.name}
          ></img>
          <figcaption className="result-caption">
            {product.productName}
          </figcaption>
        </Link>
        <span style={{ marginTop: "10px" }}>
          <span className="price">{product.price}€</span>
          <span style={{ color: "yellow", fontSize: "12px" }}>
            {"  "}
            <i className="fa-sharp fa-solid fa-star"></i>
          </span>{" "}
          {product.rating}
        </span>
      </div>
      {(breakLine + 1) % 5 === 0 && <br />}
    </>
  );
}

export default SearchResult;
