import React from "react";
import Header from "../layout/Header";
import SearchBar from "../layout/SearchBar";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import Modal from "react-modal";

const host = require("../../constants").host;

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
  const [totalPrice, setTotalPrice] = useState(0);
  const [summary, setSummary] = useState([]);
  const [isAdded, setIsAdded] = useState(false); // add to wishlist
  const [selectAll, setSelectAll] = useState(false);

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

  function close() {
    setIsOpen(false);
    setIsOpenSecond(false);
  }

  const changeItemQuantity = async (id, newValue) => {
    console.log(newValue);
    await fetch(`${host}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "addOrUpdate",
        product: id,
        quantity: newValue,
        email: user.email,
      }),
    });
    window.location.reload();
  };

  const deleteFromCart = (id) => {
    fetch(`${host}/cart`, {
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

  const addToWishList = async (id) => {
    await fetch(`${host}/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add",
        product: id,
        email: user.email,
      }),
    });
    setIsAdded(true);
  };

  const summaryHandler = (id, quantity, price, fromAll) => {
    console.log("calling summary");
    let sum;
    if (!fromAll) {
      for (let i = 0; i < summary.length; i++) {
        // remove item from summary
        if (summary[i].id === id) {
          summary.splice(i, 1);
          setSummary([...summary]);
          sum = summary.reduce(function (acc, obj) {
            return acc + parseFloat(obj.price.replace(",", ".") * obj.quantity);
          }, 0);
          setTotalPrice(sum);
          console.log(totalPrice);
          setSelectAll(false);
          return;
        }
      }
    }
    // add item to summary
    summary.push({ id: id, quantity: quantity, price: price });
    sum = summary.reduce(function (acc, obj) {
      return acc + parseFloat(obj.price.replace(",", ".") * obj.quantity);
    }, 0);
    setTotalPrice(sum);
    setSummary([...summary]);
    console.log(summary);
  };

  const selectAllHandler = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    console.log(selectAll);
    setSummary([]);

    if (selectAll) {
      // deselect all
      for (let i = 0; i < checkboxes.length - 1; i++) {
        checkboxes[i].checked = false;
      }
      setSummary([]);
      setTotalPrice(0);
    } else {
      // select all
      setSummary([]);
      console.log(summary);

      for (let i = 0; i < checkboxes.length - 1; i++) {
        checkboxes[i].checked = true;
      }
      // first deselect all
      for (let i = 0; i < summary.length; i++) {
        summary.pop();
      }

      for (let i = 0; i < summary.length; i++) {
        console.log(summary[i]);
      }

      // then add all
      for (let i = 0; i < cartItems.length; i++) {
        console.log(cartItems[i]._id);
        console.log(cartItems[i].myQuantity);
        console.log(cartItems[i].price);
        summaryHandler(
          cartItems[i]._id,
          cartItems[i].myQuantity,
          cartItems[i].price,
          true
        );
      }
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (user) {
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
    }
  }, [user]);

  return (
    <div>
      <Header />
      <SearchBar />
      <div id="cart" style={{ height: "100%" }}>
        {user ? (
          <>
            <div className="cart_h">
              Shopping cart ({cartItems && cartItems.length})
            </div>
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
                        <button
                          className="changeQuantity"
                          onClick={() =>
                            changeItemQuantity(item._id, item.myQuantity - 1)
                          }
                          style={{ backgroundColor: "rgb(218, 218, 218)" }}
                        >
                          -
                        </button>{" "}
                        {item.myQuantity}{" "}
                        <button
                          className="changeQuantity"
                          onClick={() =>
                            changeItemQuantity(item._id, item.myQuantity + 1)
                          }
                          style={{ backgroundColor: "rgb(218, 218, 218)" }}
                        >
                          +
                        </button>
                      </div>
                    </span>

                    <div style={{ float: "right" }}>
                      <button
                        style={{ display: "block" }}
                        className="wishlist_btn"
                        onClick={() => addToWishList(item._id)}
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
                        onChange={() =>
                          summaryHandler(item._id, item.myQuantity, item.price)
                        }
                      />
                      <button
                        className="wishlist_btn"
                        onClick={() => deleteFromCart(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              <div>
                <input
                  type="checkbox"
                  id="selectall"
                  name="fav_language"
                  checked={selectAll}
                  onChange={() => selectAllHandler()}
                />
                <label htmlFor="selectall">Select all products</label>
              </div>
            </div>
            <div>
              <h2>Summary</h2>
              Total: {totalPrice.toFixed(2)} €
              <br />
              <br />
              <button id="checkout">Checkout</button>
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
        {"  "}Succesfully added to your wishlist.
        <br />
        <Link to={"/wishlist"}>
          <button id="viewCart">View wishlist</button>
        </Link>
        <button id="continue" onClick={() => setIsAdded(false)}>
          Continue Shopping
        </button>
      </ReactModal>
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
          <button
            onClick={() => {
              setIsOpenSecond(true);
              setIsOpen(false);
            }}
            className="modalBtn"
          >
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
          <button
            onClick={() => {
              setIsOpen(true);
              setIsOpenSecond(false);
            }}
            className="modalBtn"
          >
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
    </div>
  );
}

export default Basket;
