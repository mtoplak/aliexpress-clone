import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import useFetchProductsFromCategory from "./useFetchProductsFromCategory";
import useFetchSubcategories from "./useFetchSubcategories";
import { Link } from "react-router-dom";

const host = require('../constants').host;


function CategoryProducts() {
  console.log(host);
  const params = useParams();
  const { category } = params;
  const [products] = useFetchProductsFromCategory(`${host}/c/${category}`);
  const [subcategories] = useFetchSubcategories(
    `${host}/subcategories/${category}`
  );
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
                </Link>
                <span style={{marginTop: '10px'}}><span className="price">{product.price}€</span>
                <span style={{ color: "yellow", fontSize: "12px" }}>{"  "}
                  <i className="fa-sharp fa-solid fa-star"></i>
                </span>{" "}
                {product.rating}</span>
              </div>
              {(index + 1) % 5 === 0 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryProducts;
