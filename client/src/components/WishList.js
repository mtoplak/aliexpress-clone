import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";

function WishList() {
  return (
    <>
      <Header />
      <SearchBar />
      <div id="wishlist">
        <div id="wishlist_h">All items ()</div>
        <div id="list">
          Move to cart <br />
          Delete
        </div>
      </div>
    </>
  );
}

export default WishList;
