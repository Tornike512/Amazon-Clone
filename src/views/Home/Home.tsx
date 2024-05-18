import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { ResponsiveContext } from "@src/providers/ResponsiveProvider";
import { useWindowSize } from "@react-hook/window-size";
import { HomeCarousel } from "@src/components/HomeCarousel/HomeCarousel";
import { FormattedMessage } from "react-intl";

import CategoryProductsTitle from "@src/views/Home/CategoryProductsTitle.json";

import kitchen1 from "@src/assets/kitchen-1.png";
import kitchen2 from "@src/assets/kitchen-2.png";
import kitchen3 from "@src/assets/kitchen-3.png";
import kitchen4 from "@src/assets/kitchen-4.png";
import book1 from "@src/assets/book-1.png";
import book2 from "@src/assets/book-2.png";
import book3 from "@src/assets/book-3.png";
import book4 from "@src/assets/book-4.png";
import videoGame1 from "@src/assets/videogames-1.png";
import videoGame2 from "@src/assets/videogame-2.png";
import videoGame3 from "@src/assets/videogames-3.png";
import videoGame4 from "@src/assets/videogames-4.png";
import toy1 from "@src/assets/toy-1.png";
import toy2 from "@src/assets/toy-2.png";
import toy3 from "@src/assets/toy-3.png";
import toy4 from "@src/assets/toy-4.png";
import beautyProducts from "@src/assets/beauty-products.jpg";
import essentialsForGamers from "@src/assets/essentials-for-gamers.jpg";
import kitchenFavorites from "@src/assets/kitchen-favorites.jpg";
import newArrivals from "@src/assets/new-arrivals.jpg";
import shopBooks from "@src/assets/shop-books.jpg";
import leftArrow from "@src/assets/left-arrow.png";
import rightArrow from "@src/assets/right-arrow.png";
import computerImage from "@src/assets/computer.jpg";

import "@src/views/Home/Home.scss";

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [swipeLeft, setSwipeLeft] = useState<boolean>(false);
  const [stopAutoSwipe, setStopAutoSwipe] = useState<boolean>(false);
  const [swipeRight, setSwipeRight] = useState<boolean>(false);
  const [width] = useWindowSize();

  const { currentCategory, setCurrentCategory } = useContext(GlobalContext);
  const { responsive587Px, setResponsive587Px } = useContext(ResponsiveContext);

  useEffect(() => {
    if (width <= 587) {
      setResponsive587Px(true);
    } else {
      setResponsive587Px(false);
    }
  }, [width]);

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
        {!responsive587Px && (
          <button className="left-button" onClick={() => stopAutoSwipeLeft()}>
            <img src={leftArrow} alt="Left Arrow" />
          </button>
        )}
        {!responsive587Px && (
          <button
            className="right-button"
            onClick={() => {
              stopAutoSwipeRight();
            }}
          >
            <img src={rightArrow} alt="Right Arrow" />
          </button>
        )}
      </a>
      <div className="category-grid">
        <div
          onClick={() => {
            navigate("/products");
            setCurrentCategory("Computers");
          }}
          className="home-page-category"
        >
          <h2>
            <FormattedMessage id="computers and accessories" />
          </h2>
          <img src={computerImage} alt="Computer Image" />
          <a href="#">
            <FormattedMessage id="shop now" />
          </a>
        </div>
        <div
          onClick={() => {
            navigate("/products");
            setCurrentCategory("Kitchen");
          }}
          className="home-page-category-grid"
        >
          <h2>
            <FormattedMessage id="Kitchen" />
          </h2>
          <div className="home-page-category-grid-spacing">
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={kitchen1} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.kitchen.title1}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={kitchen2} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.kitchen.title2}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={kitchen3} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.kitchen.title3}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={kitchen4} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.kitchen.title4}</p>
            </div>
          </div>
          <a href="#">
            <FormattedMessage id="shop now" />
          </a>
        </div>
        <div
          onClick={() => {
            navigate("/products");
            setCurrentCategory("Books");
          }}
          className="home-page-category-grid"
        >
          <h2>
            <FormattedMessage id="Books" />
          </h2>
          <div className="home-page-category-grid-spacing">
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={book1} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.books.title1}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={book2} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.books.title2}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={book3} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.books.title3}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={book4} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.books.title4}</p>
            </div>
          </div>
          <a href="#">
            <FormattedMessage id="shop now" />
          </a>
        </div>
        <div
          onClick={() => {
            navigate("/products");
            setCurrentCategory("Video Games");
          }}
          className="home-page-category-grid"
        >
          <h2>
            <FormattedMessage id="Video Games" />
          </h2>
          <div className="home-page-category-grid-spacing">
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={videoGame1} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.videoGames.title1}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={videoGame2} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.videoGames.title2}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={videoGame3} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.videoGames.title3}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={videoGame4} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.videoGames.title4}</p>
            </div>
          </div>
          <a href="#">
            <FormattedMessage id="shop now" />
          </a>
        </div>
        <div
          onClick={() => {
            navigate("/products");
            setCurrentCategory("Toys & Games");
          }}
          className="home-page-category-grid"
        >
          <h2>
            <FormattedMessage id="Toys & Games" />
          </h2>
          <div className="home-page-category-grid-spacing">
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={toy1} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.toys.title1}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={toy2} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.toys.title2}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={toy3} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.toys.title3}</p>
            </div>
            <div className="image-title">
              <div className="home-page-category-grid-image">
                <img src={toy4} alt="Computer Image" />
              </div>
              <p>{CategoryProductsTitle.toys.title4}</p>
            </div>
          </div>
          <a href="#">
            <FormattedMessage id="shop now" />
          </a>
        </div>
      </div>
      <HomeCarousel category="Computers" />
      <HomeCarousel category="Kitchen" />
      <HomeCarousel category="Books" />
      <HomeCarousel category="Video Games" />
    </div>
  );
}
