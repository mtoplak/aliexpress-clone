import React from "react";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";
import SearchBar from "../layout/SearchBar";
import useFetchOneProduct from "../../services/useFetchOneProduct";
import AddToWishlist from "../../assets/heart.svg";
import AddedToWishlist from "../../assets/heart-solid.svg";
import { useState, useContext, useEffect } from "react";
import Rating from "./Rating";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Modal from "react-modal";

const host = require("../../constants").host;

function Product() {
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;
  const [product] = useFetchOneProduct(`${host}/product/${slug}`);
  const [quantity, setQuantity] = useState(1);
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
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

  const navigateCart = () => {
    navigate("/basket");
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
    } else {
      return;
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

  const cartHandler = async () => {
    if (user) {
      await fetch(`${host}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addOrUpdate",
          product: product._id,
          quantity: quantity,
          email: user.email,
        }),
      });
      setIsAdded(true);
      console.log("added to cart");
    } else {
      return;
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
            <button id="buyNow" onClick={() => navigateCart()}>
              Buy Now
            </button>
            <button id="addToCart" onClick={() => cartHandler()}>
              Add To Cart
            </button>
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
      <Modal
        isOpen={isAdded}
        onRequestClose={() => setIsAdded(false)}
        contentLabel="My dialog"
        className="mymodal1"
        overlayClassName="myoverlay"
        closeTimeoutMS={300}
        ariaHideApp={false}
      >
        <button
          onClick={() => setIsAdded(false)}
          style={{ float: "right" }}
          className="modalBtn"
        >
          <i style={{ color: "black" }} className="fa-solid fa-xmark"></i>
        </button>
        <i className="fa-solid fa-check" style={{ color: "green" }}></i>
        A new item has been added to your Shopping Cart.
        <br />
        <button id="viewCart" onClick={() => navigateCart()}>
          View Shopping Cart
        </button>
        <button id="continue" onClick={() => setIsAdded(false)}>
          Continue Shopping
        </button>
      </Modal>
    </>
  );
}

export default Product;
