import React from "react";

function Header() {
  // React Fragment is not needed if you already wrap your content into one html tag. In this case your outer div
  return (
    <React.Fragment>
      <div className="header">
        <span>Wish List | My Account ˅</span>
      </div>
      <hr></hr>
    </React.Fragment>
  );
}

export default Header;
