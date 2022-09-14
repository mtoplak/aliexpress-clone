import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";


function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  console.log("hello world"); {/*??? */}

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

  return (
    <React.Fragment>
      <div className="header">
        <span style={{ marginTop: "3px" }}>
          <button id="wishList"><Link to="#"> Wish List</Link></button> |{" "}
          <span className="dropdown">
            <button id="myAcc">My Account ˅</button>
            <div className="dropdown-content">
              Welcome to AliExpress!
              <button id="registerDropdown" onClick={toggleModal2}>
                <Link to="#" style={{ color: "white" }}>
                  Register
                </Link>
              </button>
              <button id="signInDropdown" onClick={toggleModal}>
                Sign In
              </button>
            </div>
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
        <form method="POST">
          <input
            type="text"
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
        <form method="POST">
          <input
            type="text"
            placeholder="Email address"
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
          <input
            type="password"
            placeholder="Confirm password"
            name="password2"
            className="inputModal"
          ></input>{" "}
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
