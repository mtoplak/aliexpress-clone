import { useState, useEffect } from "react";

const useFetchSubcategories = (url) => {
  const [subcategories, setSubcategories] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((subcategories) => setSubcategories(subcategories));
  }, [url]);
  return [subcategories];
};

export default useFetchSubcategories;
