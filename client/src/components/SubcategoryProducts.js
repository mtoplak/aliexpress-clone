import React from "react";
import { Link, NavLink } from "react-router-dom";
import useFetchProductsFromCategory from "./useFetchProductsFromCategory";
import useFetchSubcategories from "./useFetchSubcategories";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import SearchResult from "./SearchResult";


function SubcategoryProducts() {
  const params = useParams();
  const { subcategory } = params;
  const { category } = params;
  const [products] = useFetchProductsFromCategory(subcategory);
  const [subcategories] = useFetchSubcategories(category);
  document.title = subcategory;

  return (
    <>
      <Header />
      <SearchBar />
      <div style={{ display: "flex", flex: 1 }}>
        <div id="categoriesOnSearch">
          {
            <Link to={`/${category}`} className="nav-item">
              {category}
            </Link>
          }
          <div id="subcategories">
            {subcategories.map((subcategoryy, index) => (
              <NavLink
                to={`/${category}/${subcategoryy}`}
                key={index}
                className="nav"
              >
                <div
                  className={subcategoryy === subcategory ? "is-active" : ""}
                >
                  {subcategoryy}
                </div>
              </NavLink>
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

export default SubcategoryProducts;
