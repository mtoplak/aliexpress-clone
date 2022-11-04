import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const host = require("../constants").host;

const useFetchQuery = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { search } = window.location;
  const query = new URLSearchParams(search).get("q");
  const url = host + "/search/" + query;

  const [loading, setIsLoading] = useState(true);
  const [relatedCategories, setRelatedCategories] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((products) => {
        setIsLoading(true);

        let relatedCategories = [];
        for (let i = 0; i < products.length; i++) {
          if (relatedCategories.indexOf(products[i].category) === -1) {
            relatedCategories.push(products[i].category);
          }
        }

        setRelatedCategories(relatedCategories);
        console.log(relatedCategories);
        let subcategoriesArray = [];

        console.log(subcategoriesArray);
        for (let i = 0; i < relatedCategories.length; i++) {
          let subcategoriesOfOneCategory = [];
          Promise.all([
            fetch(`${host}/subcategories/${relatedCategories[i]}`)
              .then((res) => res.json())
              .then((subcategories) => {
                console.log(subcategories);
                subcategoriesOfOneCategory.push(subcategories);
                console.log("pushed");
                subcategoriesArray.push(subcategoriesOfOneCategory);
                console.log("second push");
                return subcategoriesArray;
              }),
          ]).then((data) => {
            console.log(data);
            setSubcategories(subcategoriesArray);
          });
        }
        setProducts(products);
      });
    setIsLoading(false);
  }, [url, navigate]);

  return [products, loading, relatedCategories, subcategories];
};

export default useFetchQuery;
