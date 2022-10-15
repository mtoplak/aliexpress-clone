import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
//import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NoPage() {
  document.title = "404 page";
  let navigate = useNavigate();

  //const params = useParams();
  //const { category } = params;

  function goBack() {
    navigate("/");
  };

  return (
    <>
      <Header />
      <SearchBar />
      <div id="a404">
        <div
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "25px",
            margin: "5px",
            display: "block",
          }}
        >
          Sorry, we can't find that page
        </div>
        <br />
        <div
          style={{ textAlign: "center", fontSize: "15px", display: "block" }}
        >
          But we still have lots for you to discover
        </div>
        <button id="back" onClick={goBack}>Back to homepage</button>
      </div>
    </>
  );
}

export default NoPage;
