import React from "react";
import { Link, NavLink } from "react-router-dom";
import useFetchProductsFromCategory from "./useFetchProductsFromCategory";
import useFetchSubcategories from "./useFetchSubcategories";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
const host = process.env.REACT_APP_API_URL;

function SubcategoryProducts() {
  const params = useParams();
  const { subcategory } = params;
  const { category } = params;
  const [products] = useFetchProductsFromCategory(`${host}/c/${subcategory}`);
  const [subcategories] = useFetchSubcategories(
    `${host}/subcategories/${category}`
  );

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
            <React.Fragment key={index}>
              <div className="search-result">
                <Link to={`/product/${product.productName}`}>
                  <img
                    className="image-results"
                    src={product.imageUrl}
                    alt={product.name}
                  ></img>
                  <figcaption className="result-caption">
                    {product.productName}
                  </figcaption>
                  <span style={{ marginTop: "10px" }}>
                    <span className="price">{product.price}€</span>
                    <span style={{ color: "yellow", fontSize: "12px" }}>
                      {"  "}
                      <i className="fa-sharp fa-solid fa-star"></i>
                    </span>{" "}
                    {product.rating}
                  </span>
                </Link>
              </div>
              {(index + 1) % 5 === 0 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default SubcategoryProducts;
