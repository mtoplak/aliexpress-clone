import React from "react";
import category from "../assets/categories.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const host = process.env.REACT_APP_API_URL;

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(`${host}/categories`);
      const fetchedCategories = await response.json(response);
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

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
              {categories.map((category, index) => (<Link to={`/${category}`} key={index}><dt key={index}>{category}</dt></Link>))}
            </dl>
          </div></div>
    </React.Fragment>
  );
}

export default Categories;
