import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import HomeSection from "./components/HomeSection";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:3001/products");
      const fetchedProducts = await response.json(response);
      console.log(fetchedProducts);
      fetchedProducts.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      );
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Header />
      <SearchBar />
      <HomeSection products={products} featuredProducts={0} />
    </div>
  );
}

export default App;
