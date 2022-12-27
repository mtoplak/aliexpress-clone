import React from "react";
import category from "../../assets/categories.png";
import { Link } from "react-router-dom";
import useFetchCategories from "../../services/useFetchCategories";

function Categories() {
  const [categories] = useFetchCategories();

  return (
    <React.Fragment>
      <div id="categories">
        <div style={{ display: "inlineBlock" }}>
          <img
            src={category}
            style={{ width: "25px", height: "25px" }}
            alt="categories"
          ></img>{" "}
          Categories
          <dl>
            {categories.map((category, index) => (
              <Link to={`/${category}`} key={index}>
                <dt key={index}>{category}</dt>
              </Link>
            ))}
          </dl>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Categories;
