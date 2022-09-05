import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import HomeSection from "./components/HomeSection";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  // This kind of logic should be inside separate hook and should be just called here, to retrieve procuts
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:3001/products"); // Define this kind of constants in .env and export them in config.js
      // e.g. API_URL = http://localhost:3001
      const fetchedProducts = await response.json(response);
      console.log(fetchedProducts);
      // Sorting should be done on backend because its faster and decoupled from front end
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
      {/* I would add one wrapper that positions everything in place with flex / grid and then that component should have searchbar and content in HomeSection */}
      <SearchBar />
      <HomeSection products={products} featuredProducts={0} />
    </div>
  );
}

export default App;
