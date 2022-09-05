import React from "react";
import category from "../assets/categories.png";

function Categories() {
  return (
    <React.Fragment>
        <div id="categories">
      <div style={{ display: "inlineBlock" }}>
            <img
              src={category}
              style={{ width: "25px", height: "25px" }}
              alt="categories"
            ></img>{" "}
            Categories
            <dl>
              <dt>Cellphones & Telecommunications</dt>
              <dt>Computer, Office & Security</dt>
              <dt>Consumer Electonics</dt>
              <dt>Jewelry & Watches</dt>
              <dt>Home, Pet & Appliances</dt>
              <dt>Toys & Hobbies</dt>
              <dt>Outdoor, Fun & Sports</dt>
              <dt>Tools & Home Improvement</dt>
            </dl>
          </div></div>
    </React.Fragment>
  );
}

export default Categories;
