import React from "react";
import Header from "../layout/Header";
import SearchBar from "../layout/SearchBar";
import HomeSection from "../home/HomeSection";

function HomeScreen() {
  document.title =
    "AliExpress - Online Shopping for Popular Electronics, Fashion, Home & Garden, Toys & Sports, Automobiles and More.";
  return (
    <div>
      <Header />
      <SearchBar />
      <HomeSection />
    </div>
  );
}

export default HomeScreen;
