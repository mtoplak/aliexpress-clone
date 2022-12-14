import { useState, useEffect } from "react";
const fetchSubcategories = require("./fetch.js").fetchSubcategories;
const host = require("../constants").host;

const useFetchSubcategories = (category) => {
  const url = host + "/subcategories/" + category;
  const [subcategories, setSubcategories] = useState([]);
  console.log(url);

  useEffect(() => {
    async function fetchData(){
      const subcategories = await fetchSubcategories(url);
      setSubcategories(subcategories);
    }

    fetchData();
  }, [url]);
  return [subcategories];
};

export default useFetchSubcategories;
