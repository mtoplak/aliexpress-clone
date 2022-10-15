import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const host = require("../constants").host;

const useFetchQuery = (query) => {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  const url = host + "/search/"+ query;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((products) => {
        if (products.length === 0) {
          navigate("/404", { replace: true }); // to uredi da pokaže, da ne najde izdelkov
        }
        setProducts(products)});
  }, [url, navigate]);

  return [products];
};

export default useFetchQuery;
