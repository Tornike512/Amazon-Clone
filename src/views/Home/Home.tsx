import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "@src/providers/GlobalProvider";

import { TGetProducts } from "@src/@types/RequestTypes";

import beautyProducts from "@src/assets/beauty-products.jpg";
import essentialsForGamers from "@src/assets/essentials-for-gamers.jpg";
import kitchenFavorites from "@src/assets/kitchen-favorites.jpg";
import newArrivals from "@src/assets/new-arrivals.jpg";
import shopBooks from "@src/assets/shop-books.jpg";
import leftArrow from "@src/assets/left-arrow.png";
import rightArrow from "@src/assets/right-arrow.png";
import computerImage from "@src/assets/computer.jpg";

import axios from "axios";
import "@src/views/Home/Home.scss";

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [swipeLeft, setSwipeLeft] = useState<boolean>(false);
  const [stopAutoSwipe, setStopAutoSwipe] = useState<boolean>(false);
  const [swipeRight, setSwipeRight] = useState<boolean>(false);
  const [products, setProducts] = useState<TGetProducts[]>([]);

  const { currentCategory, setCurrentCategory } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("current category", JSON.stringify(currentCategory));
  }, [currentCategory]);

  const images = [
    essentialsForGamers,
    newArrivals,
    beautyProducts,
    kitchenFavorites,
    shopBooks,
  ];

  async function getProducts() {
    try {
      const response = await axios.get(
        "http://localhost:3000/product?page=1&pageSize=150"
      );
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

  function stopAutoSwipeLeft(): void {
    if (!swipeLeft) {
      setSwipeLeft(true);
      setTimeout(() => {
        changeBackgroundImage("left");
        setSwipeLeft(false);
      }, 500);
    }
    setStopAutoSwipe(true);
  }

  function stopAutoSwipeRight(): void {
    if (!swipeRight) {
      setSwipeRight(true);
      setTimeout(() => {
        changeBackgroundImage("right");
        setSwipeRight(false);
      }, 500);
    }
    setStopAutoSwipe(true);
  }

  useEffect(() => {
    localStorage.removeItem("current card id");

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
        <button className="left-button" onClick={() => stopAutoSwipeLeft()}>
          <img src={leftArrow} alt="Left Arrow" />
        </button>
        <button
          className="right-button"
          onClick={() => {
            stopAutoSwipeRight();
          }}
        >
          <img src={rightArrow} alt="Right Arrow" />
        </button>
      </a>
      <div className="category-grid">
        <div
          onClick={() => {
            navigate("/products");
            setCurrentCategory("Computers");
          }}
          className="home-page-category"
        >
          <h2>Computers and Accessories</h2>
          <img src={computerImage} alt="Computer Image" />
          <a href="#">Shop now</a>
        </div>
        {products.length > 0 && (
          <div
            onClick={() => {
              navigate("/products");
              setCurrentCategory("Kitchen");
            }}
            className="home-page-category-grid"
          >
            <h2>Kitchen</h2>
            <div className="home-page-category-grid-spacing">
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[30].image} alt="Computer Image" />
                </div>
                <p>{products[30].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[26].image} alt="Computer Image" />
                </div>
                <p>{products[26].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[27].image} alt="Computer Image" />
                </div>
                <p>{products[27].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[28].image} alt="Computer Image" />
                </div>
                <p>{products[28].title}</p>
              </div>
            </div>
            <a href="#">Shop now</a>
          </div>
        )}
        {products.length > 0 && (
          <div
            onClick={() => {
              navigate("/products");
              setCurrentCategory("Books");
            }}
            className="home-page-category-grid"
          >
            <h2>Books</h2>
            <div className="home-page-category-grid-spacing">
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[45].image} alt="Computer Image" />
                </div>
                <p>{products[45].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[46].image} alt="Computer Image" />
                </div>
                <p>{products[46].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[47].image} alt="Computer Image" />
                </div>
                <p>{products[47].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[51].image} alt="Computer Image" />
                </div>
                <p>{products[51].title}</p>
              </div>
            </div>
            <a href="#">Shop now</a>
          </div>
        )}
        {products.length > 0 && (
          <div
            onClick={() => {
              navigate("/products");
              setCurrentCategory("Video Games");
            }}
            className="home-page-category-grid"
          >
            <h2>Video Games</h2>
            <div className="home-page-category-grid-spacing">
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[69].image} alt="Computer Image" />
                </div>
                <p>{products[69].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[70].image} alt="Computer Image" />
                </div>
                <p>{products[70].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[71].image} alt="Computer Image" />
                </div>
                <p>{products[71].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[72].image} alt="Computer Image" />
                </div>
                <p>{products[72].title}</p>
              </div>
            </div>
            <a href="#">Shop now</a>
          </div>
        )}
        {products.length > 0 && (
          <div
            onClick={() => {
              navigate("/products");
              setCurrentCategory("Toys & Games");
            }}
            className="home-page-category-grid"
          >
            <h2>Toys & Games</h2>
            <div className="home-page-category-grid-spacing">
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[95].image} alt="Computer Image" />
                </div>
                <p>{products[95].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[102].image} alt="Computer Image" />
                </div>
                <p>{products[102].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[97].image} alt="Computer Image" />
                </div>
                <p>{products[97].title}</p>
              </div>
              <div className="image-title">
                <div className="home-page-category-grid-image">
                  <img src={products[98].image} alt="Computer Image" />
                </div>
                <p>{products[98].title}</p>
              </div>
            </div>
            <a href="#">Shop now</a>
          </div>
        )}
      </div>
    </div>
  );
}
