import React from "react";
import Header from "../layout/Header";
import SearchBar from "../layout/SearchBar";
import SearchResult from "./SearchResult";
import useFetchQuery from "../../services/useFetchQuery";
import NoProductsFound from "./NoProductsFound";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

function SearchResults() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("q");
  const [products, loading, relatedCategories, subcategories, allCategories] =
    useFetchQuery();
  console.log(subcategories);
  console.log(allCategories); // related categories and subcategories
  /*
  for (let i = 0; i < allCategories.length; i++) {
    console.log(allCategories[i].subcategories);
  }*/
  //console.log(subcategories[1]);
  /*
  for (let i = 0; i < subcategories.length; i++) {
    for (let j = 0; j < subcategories[i].length; j++) {
      if (subcategories[i].includes(undefined)) {
        console.log("true");
        subcategories[i].shift();
        i = 0;
      }
    }
    console.log(subcategories[i]);
  }
  console.log(subcategories);*/
  document.title = "Search results: " + query;

  const resultsRender = [];

  for (let i = 0; i < subcategories.length; i++) {
    console.log(subcategories[i]);
    let vmesnoPolje = [];
    for (let j = 0; j < subcategories[i].length; j++) {
      console.log(subcategories[i][j]);
      for (let k = 0; k < subcategories[i][j].length; k++) {
        console.log(subcategories[i][j][k]);
        vmesnoPolje.push(subcategories[i][j][k]);
      }
      console.log(vmesnoPolje);
    }
    resultsRender.push(vmesnoPolje);
  }
  console.log(resultsRender);

  return (
    <>
      <Header />
      <SearchBar value={query} />
      <div id="categoriesOnSearch">
        {products.length !== 0 && (
          <div style={{ fontWeight: "bold" }}>Related Categories</div>
        )}
        <div id="subcategories">
          {allCategories &&
            allCategories?.map((category, index) => {
              return (
                <div key={index}>
                  <Link to={`/${category.category}`}>
                    <strong>{category.category}</strong>
                  </Link>
                  {console.log(category.subcategories)}
                  {/*izpiše prav ^*/}
                  {category.subcategories?.map((subcategory, index) => (
                    <div key={index}>
                      {/*category.subcategories je undefined ˘˘*/}
                      {/*category.subcategories}
                      {subcategory*/}
                      {/*ne izpiše prav drugih podaktegorij*/}
                    </div>
                  ))}
                  {console.log(category.subcategories)}
                  {category[subcategories]?.map((subcategory, index) => (
                    <>ne izpiše</>
                  ))}
                </div>
              );
            })}
        </div>
      </div>
      <div id="results" className="left">
        {products.length !== 0 ? (
          products.map((product, index) => (
            <SearchResult
              product={product}
              key={index}
              breakLine={index}
            ></SearchResult>
          ))
        ) : query === "" ? (
          <NoProductsFound />
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
