import React from "react";
import Header from "../layout/Header";
import SearchBar from "../layout/SearchBar";
import { useParams } from "react-router-dom";
import useFetchProductsFromCategory from "../../services/useFetchProductsFromCategory";
import useFetchSubcategories from "../../services/useFetchSubcategories";
import { Link } from "react-router-dom";
import SearchResult from "../search/SearchResult";

function CategoryProducts() {
  const params = useParams();
  const { category } = params;
  const [products] = useFetchProductsFromCategory(category);
  const [subcategories] = useFetchSubcategories(category);
  document.title = category;

  return (
    <>
      <Header />
      <SearchBar />
      <div style={{ display: "flex", flex: 1 }}>
        <div id="categoriesOnSearch">
          {
            <Link to={`/${category}`} className="is-active">
              {category}
            </Link>
          }
          <div id="subcategories">
            {subcategories.map((subcategory, index) => (
              <Link
                className="nav"
                to={`/${category}/${subcategory}`}
                key={index}
              >
                <div className="">{subcategory}</div>
              </Link>
            ))}
          </div>
        </div>
        <div id="results">
          {products.map((product, index) => (
            <SearchResult
              product={product}
              key={index}
              breakLine={index}
            ></SearchResult>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryProducts;
