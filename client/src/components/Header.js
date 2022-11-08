import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useState, useEffect, useContext } from "react";
//const jwt = require("jsonwebtoken");
import { UserContext } from "../context/UserContext";

const host = require("../constants").host;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  console.log("hello world"); //???

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [existingUser, setExistingUser] = useState("");
  const [signInWarning, setSignInWarning] = useState("");

  const { user /*, setUser*/ } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      //const user = jwt.decode(token);
    }
  }, []);

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

  const signOut = async (e) => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <React.Fragment>
      <div className="header">
        <span style={{ marginTop: "3px" }}>
          <button id="wishList">
            <Link to="/wishlist"> Wish List</Link>
          </button>
          |{" "}
          <span className="dropdown">
            {user ? (
              <>
                <button className="myAcc">{user.name} ˅</button>
                <div className="dropdown-content">
                  <span style={{ fontWeight: "bold", marginBottom: "15px" }}>
                    Welcome back {user.name}!
                  </span>
                  <button
                    className="registerDropdown"
                    style={{ marginTop: "10px" }}
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                  <Link to="#" style={{ marginBottom: "8px" }}>
                    My orders
                  </Link>
                  <Link to="/wishlist">Wishlist</Link>
                </div>
              </>
            ) : (
              <>
                <button className="myAcc">My Account ˅</button>
                <div className="dropdown-content">
                  Welcome to AliExpress!
                  <button className="registerDropdown" onClick={toggleModal2}>
                    <Link to="#" style={{ color: "white" }}>
                      Register
                    </Link>
                  </button>
                  <button id="signInDropdown" onClick={toggleModal}>
                    Sign In
                  </button>
                </div>
              </>
            )}
          </span>
        </span>
      </div>
      <hr></hr>
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
    </React.Fragment>
  );
}

export default Header;
