import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/product/Product";
import CategoryProducts from "./components/pages/CategoryProducts";
import SubcategoryProducts from "./components/pages/SubcategoryProducts";
import SearchResults from "./components/search/SearchResults";
import Basket from "./components/pages/Basket";
import NoPage from "./components/other/NoPage";
import WishList from "./components/pages/WishList";
import { UserContext } from "./context/UserContext.js";
import HomeScreen from "./components/pages/HomeScreen";
import { useState, useMemo } from "react";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  console.log(user);

  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/:category" element={<CategoryProducts />} />
          <Route
            path="/:category/:subcategory"
            element={<SubcategoryProducts />}
          />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/404" element={<NoPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
