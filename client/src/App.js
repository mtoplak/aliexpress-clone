import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import HomeSection from "./components/HomeSection";

//this is HomeScreen
function App() {
  document.title = "AliExpress - Online Shopping for Popular Electronics, Fashion, Home & Garden, Toys & Sports, Automobiles and More.";
  return (
    <div>
      <Header />
      <SearchBar />
      <HomeSection />
    </div>
  );
}

export default App;
