import { CircularProgressbar } from "react-circular-progressbar";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ProductCardList from "../ProductCardList/ProductCardList";

export const ProductList = ({ dataProd, categories }) => {
  return (
    <main>
        <Breadcrumbs categories={categories} />
        {dataProd ? (
          <section className="main-container">
            {dataProd.map((product) => (
              <ProductCardList key={product.id} data={product} />
            ))}
          </section>
        ) : (
          <CircularProgressbar />
        )}
    </main>
  );
};

export default ProductList;
