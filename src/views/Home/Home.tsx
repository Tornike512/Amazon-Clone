import React, { useState } from "react";
import "@src/views/Home/Home.scss";

import beautyProducts from "@src/assets/beauty-products.jpg";
import essentialsForGamers from "@src/assets/essentials-for-gamers.jpg";
import kitchenFavorites from "@src/assets/kitchen-favorites.jpg";
import newArrivals from "@src/assets/new-arrivals.jpg";
import shopBooks from "@src/assets/shop-books.jpg";
import leftArrow from "@src/assets/left-arrow.png";
import rightArrow from "@src/assets/right-arrow.png";

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [swipeLeft, setSwipeLeft] = useState<boolean>(false);
  const [swipeRight, setSwipeRight] = useState<boolean>(false);

  const images = [
    essentialsForGamers,
    newArrivals,
    beautyProducts,
    kitchenFavorites,
    shopBooks,
  ];

  function changeBackgroundImage(direction: string) {
    if (direction === "left") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  }

  return (
    <div className="home">
      <a className="background-spacing">
        <img
          className={swipeLeft ? "home-background-left" : "home-background"}
          src={images[currentImageIndex]}
          alt="Home Background Image"
        />
        <button
          className="left-button"
          onClick={() => {
            setSwipeLeft(true);
            if (swipeLeft) {
              changeBackgroundImage("left");
            }
          }}
        >
          <img src={leftArrow} alt="Left Arrow" />
        </button>
        <button
          className="right-button"
          onClick={() => changeBackgroundImage("right")}
        >
          <img src={rightArrow} alt="Right Arrow" />
        </button>
      </a>
    </div>
  );
}
