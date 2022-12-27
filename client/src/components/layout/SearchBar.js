import React from "react";
import cart from "../../assets/cart.png";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function SearchBar(props) {
  return (
    <React.Fragment>
      <div className="flex-container search-bar">
        <Link to="/">
          <img className="logo" src={logo} alt="logo"></img>
        </Link>
        <form id="form" action="/search" method="GET">
          <input
            type="text"
            className="search"
            maxLength="50"
            autoComplete="off"
            placeholder="What are you looking for today?"
            name="q"
            defaultValue={props.value || ''}
          ></input>
          <input type="submit" className="search-button" value=""></input>
          <span style={{ marginLeft: "50px", display: "flex" }}>
            <Link to={`/basket`}><img
              style={{ width: "35px", height: "35px" }}
              src={cart}
              alt="cart"
            ></img></Link>
          </span>
        </form>
      </div>
      <hr></hr>
    </React.Fragment>
  );
}

export default SearchBar;
