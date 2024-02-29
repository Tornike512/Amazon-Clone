import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Loader } from "@src/components/Loader";

import { TGetProducts } from "@src/@types/RequestTypes";

import rightArrow from "@src/assets/right-arrow.png";
import leftArrow from "@src/assets/left-arrow.png";
import fourAndFiveStars from "@src/assets/four-half-stars.png";

import axios from "axios";

import "./ProductsCarousel.scss";

export function ProductsCarousel({ products }: { products: TGetProducts[] }) {
  const [XTranslate, setXTranslate] = useState<number>(48);
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="carousel-spacing">
      <div
        className="carousel"
        style={{ transform: `translateX(${XTranslate}%)` }}
      >
        {products?.map((product) => {
          return (
            <div key={product.id} className="carousel-item">
              <div className="carousel-image">
                <img src={product.image} alt="Carousel Product Image" />
              </div>
              <p className="carousel-product-title">{product.title}</p>
              <span className="carousel-item-rating">
                <img src={fourAndFiveStars} alt="Carousel Product Rating" />
                <span>72,274</span>
              </span>
              <h4 className="carousel-item-price">{`$${product.salePrice}.99`}</h4>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          if (XTranslate === -50) {
            setXTranslate(48);
          } else if (XTranslate === 48) {
            setXTranslate(-50);
          }
        }}
        className="right-arrow-button"
      >
        <img src={rightArrow} alt="Right Arrow" />
      </button>
      <button
        onClick={() => {
          if (XTranslate === 48) {
            setXTranslate(-50);
          } else if (XTranslate === -50) {
            setXTranslate(48);
          }
        }}
        className="left-arrow-button"
      >
        <img src={leftArrow} alt="Left Arrow" />
      </button>
    </div>
  );
}
