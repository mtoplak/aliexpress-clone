import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";

const host = require("../constants").host;

function WishList() {
  const { user /*, setUser*/ } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [existingUser, setExistingUser] = useState("");
  const [signInWarning, setSignInWarning] = useState("");
  const [wishlistItems, setWishlistItems] = useState();
  const [isAdded, setIsAdded] = useState(false); // add to cart

  console.log(wishlistItems);

  document.title = "My wish list - Aliexpress";

  useEffect(() => {
    fetch(`${host}/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "getAll",
        email: user.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch(`${host}/wishlistProducts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ids: data.wishlistItems,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setWishlistItems(data);
          });
      });
  }, [user]);

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setWarning("Passwords do not match");
    } else if (password.length < 8) {
      setWarning("Password should be at least 8 characters long!");
    } else {
      const response = await fetch(`${host}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });
      if (response.status === 400) {
        setExistingUser("This email already exists!");
      } else {
        setIsOpenSecond(false);
        setIsOpen(true);
      }
    }
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.forms["logIn"].email.value,
        password: document.forms["logIn"].password.value,
      }),
    });
    const data = await response.json();
    console.log(data.email);
    if (response.status === 400) {
      setSignInWarning("Your account name or password is incorrect.");
    } else {
      const userToSave = { email: data.email, name: data.name };
      localStorage.setItem("user", JSON.stringify(userToSave));
      //setUser(userToSave);
      console.log(userToSave);
      window.location.reload();
    }
  };

  function toggleModal() {
    setIsOpen(true);
    setIsOpenSecond(false);
  }

  function toggleModal2() {
    setIsOpenSecond(true);
    setIsOpen(false);
  }

  function close() {
    setIsOpen(false);
    setIsOpenSecond(false);
  }

  const wishlistHandler = async (id) => {
    fetch(`${host}/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "remove",
        product: id,
        email: user.email,
      }),
    });
    window.location.reload();
  };

  const cartHandler = async (id) => {
    await fetch(`${host}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "addOrUpdate",
        product: id,
        quantity: 1,
        email: user.email,
      }),
    });
    setIsAdded(true);
    console.log("added to cart");
  };

  return (
    <>
      <Header />
      <SearchBar />
      <div id="wishlist">
        {user ? (
          <>
            <div className="wishlist_h">
              All items ({wishlistItems && wishlistItems.products.length})
            </div>
            <div style={{ float: "right", marginRight: "90px" }}>
              {wishlistItems &&
                wishlistItems.products.map((product) => (
                  <div key={product._id} className="wishlist_item">
                    <Link to={`/product/${product.productName}`}>
                      <img
                        alt={product.productName}
                        className="wishlist_pic"
                        src={product.imageUrl}
                      ></img>
                    </Link>
                    <span className="is-active wishlist_cap">
                      <Link to={`/product/${product.productName}`}>
                        {product.productName}
                      </Link>
                      <br />
                      <br />
                      <span style={{ fontWeight: "400" }}>
                        {product.price} €
                      </span>
                      <br />
                    </span>
                    <div style={{ float: "right" }}>
                      <button
                        style={{ display: "block" }}
                        className="wishlist_btn"
                        onClick={() => cartHandler(product._id)}
                      >
                        Add to cart{" "}
                      </button>
                      <button
                        className="wishlist_btn"
                        onClick={() => wishlistHandler(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="wishlist_h">
            Please{" "}
            <span className="wishlist_b" onClick={() => setIsOpen(true)}>
              sign in
            </span>{" "}
            or{" "}
            <span className="wishlist_b" onClick={() => setIsOpenSecond(true)}>
              register
            </span>{" "}
            to view your wish list.
          </div>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={close}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={300}
        ariaHideApp={false}
      >
        <button onClick={close} style={{ float: "right" }} className="modalBtn">
          <i style={{ color: "black" }} className="fa-solid fa-xmark"></i>
        </button>
        <br />
        <div>
          <button className="modalBtn currentTab">Sign in </button>{" "}
          <button onClick={toggleModal2} className="modalBtn">
            {" "}
            Register
          </button>
        </div>
        <br />
        <form method="POST" name="logIn" onSubmit={signInHandler}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="inputModal"
            style={{ borderRadius: "5px" }}
          ></input>
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="inputModal"
          ></input>
          <br />
          <span className="warning">{signInWarning}</span>
          <br />
          <button type="submit" className="modalSubmit">
            Sign in
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={isOpenSecond}
        onRequestClose={close}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={300}
        ariaHideApp={false}
      >
        <button onClick={close} style={{ float: "right" }} className="modalBtn">
          <i style={{ color: "black" }} className="fa-solid fa-xmark"></i>
        </button>
        <br />
        <div>
          <button onClick={toggleModal} className="modalBtn">
            Sign in{" "}
          </button>{" "}
          <button className="modalBtn currentTab"> Register</button>
        </div>
        <br />
        <form method="POST" onSubmit={registerHandler}>
          <input
            type="text"
            placeholder="First name"
            name="name"
            className="inputModal"
            style={{ borderRadius: "5px" }}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Email address"
            name="email"
            className="inputModal"
            style={{ borderRadius: "5px" }}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />
          <span className="warning" style={{ margin: 0 }}>
            {existingUser}
          </span>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="inputModal"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            className="inputModal"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>{" "}
          <br />
          <span className="warning">{warning}</span>
          <br />
          <button type="submit" className="modalSubmit">
            Register
          </button>
        </form>
      </Modal>
      <ReactModal
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
        {"  "}Succesfully added to cart.
        <br />
        <Link to={"/basket"}>
          <button id="viewCart">View cart</button>
        </Link>
        <button id="continue" onClick={() => setIsAdded(false)}>
          Continue Shopping
        </button>
      </ReactModal>
    </>
  );
}

export default WishList;
