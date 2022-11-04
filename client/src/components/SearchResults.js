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
  const [products, loading, relatedCategories, subcategories] = useFetchQuery();
  console.log(subcategories);
  console.log(subcategories[1]); /*
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
          {subcategories &&
            relatedCategories &&
            relatedCategories.map((category, index) => (
              <div key={index}>
                <Link to={`/${category}`}>
                  <strong>{category}</strong>
                </Link>
                <br />
                {console.log("index: " + index)}
                {/*subcategories.map((subcategory, i) => (
                  <>
                    <div key={index}>
                      <div>sub: {subcategories[i][index]}</div>
                    </div>
                    <br />
                  </>
                ))*/}
                {/*subcategories.map((row, indexNovi) =>
                  subcategories.map((column, indexNovejsi) => subcategories[indexNovi][indexNovejsi])
              )/*column[index]*/}
                {/*subcategories.map((subcategories, index, arr) => (arr[index]))*/}
                {console.log(resultsRender[index])}
                {console.log("subkategorije: " + subcategories[index])}
                {/*subcategories[index]*/}
                {/*subcategories[1]*/}
                {console.log(resultsRender)}
                {/*resultsRender.map((subcategories, index) =>
                    subcategories.map((subcategory, nexIndex) => (
                      <li key={nexIndex}>{resultsRender}</li>
                    ))
                    )*/}
                {resultsRender.map((items, index) => {
                  return (
                    <div key={items}>
                      {items.map((subItems, sIndex) => {
                        return <div> {subItems} </div>;
                      })}
                    </div>
                  );
                })}
                {console.log(resultsRender[1])}
              </div>
            ))}
        </div>
        {resultsRender.map((items, index) => {
          return (
            <div key={items}>
              {items.map((subItems, sIndex) => {
                return <div> {subItems} </div>;
              })}
            </div>
          );
        })}
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
