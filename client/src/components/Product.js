import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import useFetchOneProduct from "./useFetchOneProduct";
import AddToWishlist from "../assets/heart.svg";
import AddedToWishlist from "../assets/heart-solid.svg";
import { useState, useContext, useEffect } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const host = require("../constants").host;

function Product() {
  const params = useParams();
  const { slug } = params;
  const [product] = useFetchOneProduct(`${host}/product/${slug}`);
  const [quantity, setQuantity] = useState(1);
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const { user /*, setUser*/ } = useContext(UserContext);

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

  useEffect(() => {
    //check if product is already on wishlist
    async function fetchData() {
      const response = await fetch(`${host}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user,
          product: product._id,
        }),
      });
      const data = await response.json();
      if (data.msg === "found") {
        setIsOnWishlist(true);
      } else {
        setIsOnWishlist(false);
      }
    }
    if (user && product) {
      fetchData();
    }
  }, [product, user]);

  const wishlistHandler = async () => {
    if (user) {
      setIsOnWishlist(!isOnWishlist);
    }
    if (isOnWishlist) {
      fetch(`${host}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "remove",
          product: product._id,
          email: user.email,
        }),
      });
    } else {
      await fetch(`${host}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          product: product._id,
          email: user.email,
        }),
      });
    }
  };

  document.title = product.productName;

  return (
    <>
      <Header />
      <SearchBar />
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
            <button id="addToWishList" onClick={() => wishlistHandler()}>
              <img
                style={{ width: "22px", height: "15px" }}
                src={isOnWishlist ? AddedToWishlist : AddToWishlist}
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
