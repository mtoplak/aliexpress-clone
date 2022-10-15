import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import CategoryProducts from "./components/CategoryProducts";
import SubcategoryProducts from "./components/SubcategoryProducts";
import SearchResults from "./components/SearchResults";
import NoPage from "./components/NoPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/product/:slug" element={<Product />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/:category" element={<CategoryProducts />} />
      <Route path="/:category/:subcategory" element={<SubcategoryProducts />} />
      <Route path="/404" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
