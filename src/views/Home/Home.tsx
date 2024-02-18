import { useState, useEffect } from "react";
import axios from "axios";

import beautyProducts from "@src/assets/beauty-products.jpg";
import essentialsForGamers from "@src/assets/essentials-for-gamers.jpg";
import kitchenFavorites from "@src/assets/kitchen-favorites.jpg";
import newArrivals from "@src/assets/new-arrivals.jpg";
import shopBooks from "@src/assets/shop-books.jpg";
import leftArrow from "@src/assets/left-arrow.png";
import rightArrow from "@src/assets/right-arrow.png";

import "@src/views/Home/Home.scss";

interface TCategory {
  id: string;
  name: string;
}

interface TGetProducts {
  title: string;
  description: string;
  image: string;
  price: number;
  salePrice: null;
  category_name: string;
  id: string;
}

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [swipeLeft, setSwipeLeft] = useState<boolean>(false);
  const [stopAutoSwipe, setStopAutoSwipe] = useState<boolean>(false);
  const [swipeRight, setSwipeRight] = useState<boolean>(false);
  const [products, setProducts] = useState<TGetProducts[]>([]);

  const images = [
    essentialsForGamers,
    newArrivals,
    beautyProducts,
    kitchenFavorites,
    shopBooks,
  ];

  const homePageCategories: TCategory[] = [
    { id: "gaming-accessories-id", name: "Gaming Accessories" },
    { id: "deals-in-pcs-id", name: "Deals in PCs" },
    { id: "refresh-page-id", name: "Refresh your page" },
    { id: "toys-under-25-id", name: "Toys under $25" },
    { id: "amazon-gadget-store-id", name: "Amazon Gadget Store" },
    { id: "deals-in-fashion-id", name: "Shop deals in Fashion" },
    { id: "fashion-trends-id", name: "Fashion trends you like" },
    { id: "music-audio-id", name: "Handpicked music & audio" },
  ];

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setProducts(response.data.products);
    } catch (error) {
      console.log("Error Loading Products", error);
    }
  }

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

  useEffect(() => {
    let swipeRightInterval: NodeJS.Timeout;

    if (!stopAutoSwipe) {
      swipeRightInterval = setInterval(() => {
        setSwipeRight(true);
        setTimeout(() => {
          setSwipeRight(false);
          changeBackgroundImage("right");
        }, 500);
      }, 5000);

      getProducts();
    }

    return () => clearInterval(swipeRightInterval);
  }, [stopAutoSwipe]);

  return (
    <div className="home">
      <a className="background-spacing">
        <img
          className={
            swipeLeft
              ? "home-background-left"
              : swipeRight
              ? "home-background-right"
              : "home-background"
          }
          src={images[currentImageIndex]}
          alt="Home Background Image"
        />
        {swipeLeft && (
          <img
            className={swipeLeft ? "home-background-left-switch" : ""}
            src={
              currentImageIndex - 1 === -1
                ? images[4]
                : images[currentImageIndex - 1]
            }
            alt="Home Background Image"
          />
        )}
        {swipeRight && (
          <img
            className={swipeRight ? "home-background-right-switch" : ""}
            src={
              currentImageIndex + 1 === 5
                ? images[0]
                : images[currentImageIndex + 1]
            }
            alt="Home Background Image"
          />
        )}
        <button
          className="left-button"
          onClick={() => {
            if (!swipeLeft) {
              setSwipeLeft(true);
              setTimeout(() => {
                changeBackgroundImage("left");
                setSwipeLeft(false);
              }, 500);
            }
            setStopAutoSwipe(true);
          }}
        >
          <img src={leftArrow} alt="Left Arrow" />
        </button>
        <button
          className="right-button"
          onClick={() => {
            if (!swipeRight) {
              setSwipeRight(true);
              setTimeout(() => {
                changeBackgroundImage("right");
                setSwipeRight(false);
              }, 500);
            }
            setStopAutoSwipe(true);
          }}
        >
          <img src={rightArrow} alt="Right Arrow" />
        </button>
        <div className="category-grid">
          {homePageCategories.map((homePageCategory) => {
            return (
              <div className="home-page-category" key={homePageCategory.id}>
                {homePageCategory.name}
              </div>
            );
          })}
        </div>
      </a>
      {products.map((product) => {
        return (
          <div key={product.id}>
            {product.title}
            <img src={product.image} alt="" />
          </div>
        );
      })}
    </div>
  );
}
