import React from "react";
import { Link } from "react-router-dom";
import Free_Shippin from "../../assets/images/ic_shipping.png";
import Blank_Picture from "../../assets/images/platzhalter.png";
import { formatAsCurrency } from "../../utils/helper";

export const ProductCard = (props) => {
  return (
    <>
      <section className="card-product">
        <Link to={"/items/" + props?.data?.id} className="container-card">
          <div className="img-container">
            <img
              alt="imagen del producto"
              className="img-product"
              src={props?.data?.picture ? props?.data?.picture : Blank_Picture}
            />
          </div>
          <div className="title-container">
            <div className="container-info-product">
              <div className="container-price">
                <p className="price-text">$ {formatAsCurrency(props?.data?.price?.amount)}</p>
                {props?.data?.free_shippin ? (
                  <img
                    alt="logo envio"
                    src={Free_Shippin}
                    className="icon-envio"
                  />
                ) : null}
              </div>
              <div>
                <p>{props?.data?.title}</p>
              </div>
            </div>
            <div className="lugar-product">
              <p>{props?.data?.location ? props?.data?.location : "Argentina"}</p>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
};

export default ProductCard;
