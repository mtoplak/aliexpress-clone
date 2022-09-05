import React from "react";
import Categories from "./Categories.js";
import Welcome from "./Welcome.js";
import FeaturedProducts from "./FeaturedProducts";

function HomeSection(props) {
  return (
    <React.Fragment>
      <div id="section">
        <Categories/>
        <Welcome/>
        <FeaturedProducts products={props.products}/>
      </div>
    </React.Fragment>
  );
}

export default HomeSection;
