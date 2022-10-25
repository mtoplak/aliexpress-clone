import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import useFetchOneProduct from "./useFetchOneProduct";
import AddToWishlist from "../assets/heart.svg";
import { useState } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const host = require("../constants").host;

function Product() {
  const params = useParams();
  const { slug } = params;
  const [product] = useFetchOneProduct(`${host}/product/${slug}`);
  const [quantity, setQuantity] = useState(1);
  /*
  useEffect(() => {
    document.title = product.productName;
  });*/

  const handleIncrement = () => {
    if (quantity < product.quantityInStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  document.title = product.productName;

  return (
    <>
      <Header />
      <SearchBar />
      {console.log(product.category)}
      <div id="productCategory">
        <Link to={`/${product.category}`}>{product.category + " > "}</Link>
        <Link to={`/${product.category}/${product.subcategory}`}>
          {product.subcategory}
        </Link>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div id="productOnPage">
          <img
            className="product"
            src={product.imageUrl}
            alt={product.productName}
          />
        </div>
        <div id="productOnPage">
          <div id="product-title-text">{product.productName} </div>
          <div className="detail">
            <Rating
              style={{ color: "yellow" }}
              rating={product.rating}
              orders={product.orders}
            />
          </div>
          <br />
          <div className="product-price">
            {product.price + " "}€ <br />
          </div>
          <div className="detail"> Quantity: </div>
          <div className="detail" style={{ marginBottom: "18px" }}>
            <button className="changeQuantity" onClick={handleDecrement}>
              -
            </button>{" "}
            {quantity}{" "}
            <button className="changeQuantity" onClick={handleIncrement}>
              +
            </button>
          </div>
          <div>
            <button id="buyNow">Buy Now</button>
            <button id="addToCart">Add To Cart</button>
            <button id="addToWishList">
              <img
                style={{ width: "15px", height: "15px" }}
                src={AddToWishlist}
                alt="add to wishlist"
              ></img>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
