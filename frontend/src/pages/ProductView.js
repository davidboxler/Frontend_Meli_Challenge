import React, { useCallback, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { Global } from "../utils/global";

export const ProductView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getProductsDetails = useCallback(async () => {
    const id = params.id;
    const request = await fetch(Global.url + "items/" + id, {
      method: "GET",
    });
    const data = await request.json();
    setProducts(data.item);
    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    getProductsDetails();
  }, [getProductsDetails]);

  return (
    <main>
      <Breadcrumbs categories={products.categories} />
      {loading ? (
        <section className="progress-bar">
          <CircularProgressbar />
        </section>
      ) : (
        <section className="main-container">
          <ProductDetails
            title={products.title}
            price={products.price}
            picture={products.picture}
            condition={products.condition}
            sold_quantity={products.sold_quantity}
            description={products.description}
          />
          <div className="ht-40px"></div>
        </section>
      )}
    </main>
  );
};

export default ProductView;
