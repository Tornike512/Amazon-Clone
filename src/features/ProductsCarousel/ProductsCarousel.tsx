import { useState, useEffect } from "react";

import { TGetProducts } from "@src/@types/RequestTypes";

import fourAndFiveStart from "@src/assets/four-half-stars.png";
import rightArrow from "@src/assets/right-arrow.png";
import leftArrow from "@src/assets/left-arrow.png";

import axios from "axios";

import "./ProductsCarousel.scss";

export function ProductsCarousel() {
  const [carouselProducts, setCarouselProducts] = useState<
    TGetProducts[] | null
  >(null);
  async function getCarouselProducts() {
    try {
      const response = await axios.get(
        `http://localhost:3000/product?pageSize=7`
      );
      setCarouselProducts(response.data.products);
    } catch (error) {
      console.log("Error Loading Products", error);
    }
  }

  useEffect(() => {
    getCarouselProducts();
  }, []);

  return (
    <div className="carousel">
      {carouselProducts?.map((carouselProduct) => {
        return (
          <div key={carouselProduct.id} className="carousel-item">
            <div className="carousel-image">
              <img src={carouselProduct.image} alt="Carousel Product Image" />
            </div>
            <p className="carousel-product-title">{carouselProduct.title}</p>
            <span>
              <img src={fourAndFiveStart} alt="Carousel Product Rating" />
              <span>72,274</span>
            </span>
            <h4>{carouselProduct.salePrice}</h4>
          </div>
        );
      })}
      <button className="right-arrow-button">
        <img src={rightArrow} alt="Right Arrow" />
      </button>
      <button className="left-arrow-button">
        <img src={leftArrow} alt="Left Arrow" />
      </button>
    </div>
  );
}
