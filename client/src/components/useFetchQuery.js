import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const host = require("../constants").host;

const useFetchQuery = (query) => {
  const [products, setProducts] = useState([]); //null
  const navigate = useNavigate();
  const url = host + "/search/" + query;

  const [loading, setLoading] = useState(true);
  const [relatedCategories, setRelatedCategories] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((products) => {
        setLoading(true);

        let relatedCategories = [];
        for (let i = 0; i < products.length; i++) {
          if (relatedCategories.indexOf(products[i].category) === -1) {
            relatedCategories.push(products[i].category);
          }
        }

        setRelatedCategories(relatedCategories);
        let subcategoriesArray = [];
        for (let i = 0; i < relatedCategories.length; i++) {
          fetch(`${host}/subcategories/${relatedCategories[i]}`)
            .then((res) => res.json())
            .then((subcategories) => {
              subcategoriesArray[i] = subcategories;
            });
        }
        setSubcategories(subcategoriesArray);
        setProducts(products);
      });
    setLoading(false);
  }, [url, navigate]);

  return [products, loading, relatedCategories, subcategories];
  
};

export default useFetchQuery;
