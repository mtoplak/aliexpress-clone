import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const host = require("../constants").host;

function Basket() {
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
  const [cartItems, setCartItems] = useState();

  document.title = "Shopping Cart - Aliexpress";

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

  const changeItemQuantity = () => {
    console.log("changeItemQuantity");
  }

  useEffect(() => {
    fetch(`${host}/cart`, {
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
        fetch(`${host}/cartProducts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ids: data.cart,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            for (let i = 0; i < data.products.length; i++) {
              data.products[i].myQuantity = data.myQuantities[i];
            }
            console.log(data.products);
            setCartItems(data.products);
          });
      });
  }, []);

  return (
    <div>
      <Header />
      <SearchBar />
      <div id="cart">
        {user ? (
          <>
            <div className="cart_h">Shopping cart ({cartItems && cartItems.length})</div>
            <div style={{ float: "right", marginRight: "90px" }}>
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item) => (
                  <div key={item._id} className="wishlist_item">
                    <Link to={`/product/${item.productName}`}>
                      <img
                        alt={item.productName}
                        className="wishlist_pic"
                        src={item.imageUrl}
                      ></img>
                    </Link>

                    <span className="is-active wishlist_cap">
                      <Link to={`/product/${item.productName}`}>
                        {item.productName}
                      </Link>
                      <br />
                      <br />
                      <span style={{ fontWeight: "400" }}>{item.price} €</span>
                      <br />
                      <div
                        style={{
                          float: "bottom",
                          fontWeight: "400",
                          marginTop: "50px",
                        }}
                      >
                        <button className="changeQuantity" onClick={() => changeItemQuantity()} style={{backgroundColor: "rgb(218, 218, 218)"}}>-</button>{" "}
                        {item.myQuantity}{" "}
                        <button className="changeQuantity" onClick={() => changeItemQuantity()} style={{backgroundColor: "rgb(218, 218, 218)"}}>+</button>
                      </div>
                    </span>

                    <div style={{ float: "right" }}>
                      <button
                        style={{ display: "block" }}
                        className="wishlist_btn"
                        onClick={() => console.log()}
                      >
                        Add to wishlist{" "}
                      </button>
                      <input
                        type="checkbox"
                        style={{
                          display: "inline-block",
                          float: "right",
                          verticalAlign: "middle",
                        }}
                      />
                      <button className="wishlist_btn">Delete</button>
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
            to view your cart.
          </div>
        )}
      </div>
    </div>
  );
}

export default Basket;
