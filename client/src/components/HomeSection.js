import React from "react";
import Categories from "./Categories.js";
import Welcome from "./Welcome.js";
import FeaturedProducts from "./FeaturedProducts";

function HomeSection() {
  return (
    <React.Fragment>
      <div id="section" className="flex-container">
        <Categories />
        <Welcome />
        <FeaturedProducts />
      </div>
    </React.Fragment>
  );
}

export default HomeSection;
