import { useState, useEffect } from "react";
import { Loader } from "@src/components/Loader";

import { TGetProducts } from "@src/@types/RequestTypes";

import rightArrow from "@src/assets/right-arrow.png";
import leftArrow from "@src/assets/left-arrow.png";
import fourAndFiveStars from "@src/assets/four-half-stars.png";

import axios from "axios";

import "./ProductsCarousel.scss";

export function ProductsCarousel() {
  const [carouselProducts, setCarouselProducts] = useState<
    TGetProducts[] | null
  >(null);
  const [XTranslate, setXTranslate] = useState<number>(48);
  const [loading, setLoading] = useState<boolean>(false);

  async function getCarouselProducts() {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/product?pageSize=14`
      );
      setCarouselProducts(response.data.products);
    } catch (error) {
      console.log("Error Loading Products", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCarouselProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="carousel-spacing">
      <div
        className="carousel"
        style={{ transform: `translateX(${XTranslate}%)` }}
      >
        {carouselProducts?.map((carouselProduct) => {
          return (
            <div key={carouselProduct.id} className="carousel-item">
              <div className="carousel-image">
                <img src={carouselProduct.image} alt="Carousel Product Image" />
              </div>
              <p className="carousel-product-title">{carouselProduct.title}</p>
              <span className="carousel-item-rating">
                <img src={fourAndFiveStars} alt="Carousel Product Rating" />
                <span>72,274</span>
              </span>
              <h4 className="carousel-item-price">{`$${carouselProduct.salePrice}.99`}</h4>
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
