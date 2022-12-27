import { useState, useEffect } from "react";
const host = require("../constants").host;

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const url = host + "/categories";

  useEffect(() => {
    async function fetchCategories() {
        const response = await fetch(`${host}/categories`);
        const fetchedCategories = await response.json(response);
        setCategories(fetchedCategories);
      }
      fetchCategories();
  }, [url]);
  return [categories];
};

export default useFetchCategories;
