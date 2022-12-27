import React from "react";
import cart from "../../assets/nothingFound.png";

function NoProductsFound() {
  return (
    <div style={{ position: "relative", right: "450px" }}>
      <img
        src={cart}
        alt="sad cart"
        style={{ width: "350px", height: "350px" }}
      ></img>{" "}
      <br />
      <div
        style={{
          backgroundColor: "rgb(218, 218, 218)",
          fontWeight: "bold",
          fontSize: "24px",
          padding: "4px",
          borderRadius: "13px",
        }}
      >
        No Products Were Found Here
      </div>
    </div>
  );
}

export default NoProductsFound;
