import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import useFetchQuery from "./useFetchQuery";
import NoProductsFound from "./NoProductsFound";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

function SearchResults() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("q");
  const [products, loading, relatedCategories, subcategories] =
    useFetchQuery(query);
  console.log(relatedCategories);
  console.log(subcategories);
  console.log(subcategories[0]);
  document.title = "Search results: " + query;
  return (
    <>
      <Header />
      <SearchBar value={query} />
      <div id="categoriesOnSearch">
        {products.length !== 0 && (
          <div style={{ fontWeight: "bold" }}>Related Categories</div>
        )}
        <div id="subcategories">
          {subcategories &&
            relatedCategories &&
            relatedCategories.map((category, index) => (
              <div key={index}>
                <Link to={`/${category}`}>{category}</Link>
                {"search 'home' in search bar to get more subcategories"}
                {console.log("index: " + index)}
                {console.log("subkategorija: " + subcategories[0])}
                {subcategories[index]}
              </div>
            ))}
        </div>
      </div>
      <div id="results" className="left">
        {/*products.length !== 0 ? (
          (
            products.map((product, index) => (
              <SearchResult
                product={product}
                key={index}
                breakLine={index}
              ></SearchResult>
            ))
          )
            ) : <NoProductsFound />*/}
        {products.length !== 0 ? (
          products.map((product, index) => (
            <SearchResult
              product={product}
              key={index}
              breakLine={index}
            ></SearchResult>
          ))
        ) : !loading ? (
          <div style={{ position: "relative", right: "450px" }}>
            <ClipLoader color="red" size={150} />
          </div>
        ) : (
          <NoProductsFound />
        )}
      </div>
    </>
  );
}

export default SearchResults;
