import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import HomeSection from "./HomeSection";

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
