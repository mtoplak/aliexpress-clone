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
  const [both, setBoth] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((products) => {
        setIsLoading(true);

        let relatedCategories = [];
        for (let i = 0; i < products.length; i++) {
          let obj = {};
          if (relatedCategories.indexOf(products[i].category) === -1) {
            relatedCategories.push(products[i].category);
            obj.category = products[i].category;
            
            both.push(obj);
          }
        }
        console.log(both);

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
                both[i].subcategories = subcategoriesOfOneCategory;
                console.log("second push");
                return subcategoriesArray;
              }),
          ]).then((data) => {
            console.log(data);
            console.log(both);
            setBoth(both);
            setSubcategories(subcategoriesArray);
          });
        }
        setProducts(products);
      });
    setIsLoading(false);
  }, [url, navigate, both]);

  return [products, loading, relatedCategories, subcategories, both];
};

export default useFetchQuery;
