import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import useFetchQuery from "./useFetchQuery";


function SearchResults() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("q");
  const [products] = useFetchQuery(query);
  document.title = "Search results: " + query;

  return (
    <>
      <Header />
      <SearchBar value={query} />
      <div id="categoriesOnSearch">
        categories here
      </div>
      <div id="results" className="left">
        {products &&
          products.map((product, index) => (
            <SearchResult product={product} key={index} breakLine={index}></SearchResult>
          ))}
      </div>
    </>
  );
}

export default SearchResults;
