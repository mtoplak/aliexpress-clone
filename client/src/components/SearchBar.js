import React from "react";
import cart from "../assets/cart.png";
import logo from "../assets/logo.png";

function SearchBar() {
  return (
    <React.Fragment>
      <div className="flex-container search-bar">
      <img className="logo" src={logo} alt="logo"></img>
      
      <form id="form" method="GET" action="#">
        <input
          type="text"
          className="search"
          maxLength="50"
          autoComplete="off"
          placeholder="What are you looking for today?"
        ></input>
        <input type="submit" className="search-button" value=""></input>
        <span style={{ marginLeft: "50px", display: "flex" }}>
          <img
            style={{ width: "35px", height: "35px" }}
            src={cart}
            alt="cart"
          ></img>
        </span>
      </form>
      <hr></hr></div>
    </React.Fragment>
  );
}

export default SearchBar;
