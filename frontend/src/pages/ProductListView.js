import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList/ProductList";
import { Global } from "../utils/global";

export const ProductListView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchValue = location.search.split("=")[1];
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProductsDetails = useCallback(async () => {
    if (!searchValue) {
      navigate("/error_404");
      return;
    }

    const request = await fetch(Global.url + "items/search/" + searchValue, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (!data || !data.items) {
      navigate("/error_404");
      return;
    }

    setProducts(data.items);
    setCategories(data.categories);
  }, [navigate, searchValue]);

  useEffect(() => {
    getProductsDetails();
  }, [getProductsDetails]);

  return (
    <>
      <ProductList dataProd={products} categories={categories} />
    </>
  );
};

export default ProductListView;
