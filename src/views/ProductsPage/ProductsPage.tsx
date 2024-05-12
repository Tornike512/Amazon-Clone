import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@react-hook/window-size";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { ResponsiveContext } from "@src/providers/ResponsiveProvider";
import { FormattedMessage, useIntl } from "react-intl";

import { TGetProducts } from "@src/@types/RequestTypes";

import CategoryTitle from "@src/views/ProductsPage/CategoryTitle.json";

import fourHalfStars from "@src/assets/four-half-stars.png";

import axios from "axios";

import "./ProductsPage.scss";

export function ProductsPage() {
  const {
    products,
    setProducts,
    deliverTo,
    setProductId,
    loading,
    setLoading,
  } = useContext(GlobalContext);

  const [quickLook, setQuickLook] = useState<number | null>(null);
  const [minSlice, setMinSlice] = useState<number>(0);
  const [maxSlice, setMaxSlice] = useState<number>(4);
  const { width } = useWindowSize();

  const { responsive587Px, setResponsive587Px } = useContext(ResponsiveContext);

  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  useEffect(() => {
    if (width <= 587) {
      setResponsive587Px(true);
    } else {
      setResponsive587Px(false);
    }
  }, [width]);

  const currentCategory = JSON.parse(
    localStorage.getItem("current category") || ""
  );

  async function getProducts() {
    try {
      if (currentCategory === "Toys & Games") {
        const response = await axios.get(
          `http://localhost:3000/product?pageSize=30&categoryName=Toys%20%26%20Games`
        );
        setProducts(response.data.products);
      } else if (currentCategory !== "Toys & Games") {
        const response = await axios.get(
          `http://localhost:3000/product?pageSize=20&categoryName=${currentCategory}`
        );
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log("Error Loading Products", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [currentCategory]);

  const topRatedProducts = products.slice(minSlice, maxSlice);

  const under25Products = products.slice(minSlice + 4, maxSlice + 4);

  const categoryProducts = products
    .slice(minSlice + 8, maxSlice + 220)
    .filter((product) => {
      return product.salePrice;
    });

  const handleCategoryTitle = () => {
    switch (currentCategory) {
      case "Computers":
        return CategoryTitle.ComputersTitle;
      case "Kitchen":
        return CategoryTitle.KitchenTitle;
      case "Books":
        return CategoryTitle.BooksTitle;
      case "Video Games":
        return CategoryTitle.VideoGamesTitle;
      case "Toys & Games":
        return CategoryTitle.ToysAndGamesTitle;
      case "Beauty & Personal Care":
        return CategoryTitle.BeautyAndPersonalCareTitle;
      default:
        return "";
    }
  };

  const handleCategoryDescription = () => {
    switch (currentCategory) {
      case "Computers":
        return CategoryTitle.ComputersDescription;
      case "Kitchen":
        return CategoryTitle.KitchenDescription;
      case "Books":
        return CategoryTitle.BooksDescription;
      case "Video Games":
        return CategoryTitle.VideoGamesDescription;
      case "Toys & Games":
        return CategoryTitle.ToysAndGamesDescription;
      case "Beauty & Personal Care":
        return CategoryTitle.BeautyAndPersonalCareDescription;
      default:
        return "";
    }
  };

  if (loading) {
    return <div className="loading">Loading</div>;
  }

  return (
    <div className="products-page">
      <div className="products">
        <h1 className="product-page-title">{handleCategoryTitle()}</h1>
        <p className="products-description">{handleCategoryDescription()}</p>
        <h2>Top rated</h2>
        <div className="top-rated">
          <div className="top-rated-spacing">
            {topRatedProducts
              .filter((product) => product.category_name === currentCategory)
              .map((product, index) => {
                return (
                  <div
                    className="top-rated-item-spacing"
                    style={
                      !responsive587Px
                        ? {
                            height: "280px",
                            marginBottom: "245px",
                            marginRight: "5px",
                            borderRadius: "4px",
                            backgroundColor: "#f7f4f4",
                            cursor: "pointer",
                          }
                        : {
                            height: "180px",
                            marginBottom: "15px",
                            marginRight: "5px",
                            borderRadius: "4px",
                            backgroundColor: "#f7f4f4",
                            cursor: "pointer",
                          }
                    }
                    key={product.id}
                    onClick={() => {
                      setProductId(product.id);
                      navigate(`/products/${product.id}`);
                      setLoading(true);
                      window.location.reload();
                    }}
                  >
                    <div
                      onMouseOver={() => setQuickLook(index)}
                      onMouseLeave={() => setQuickLook(null)}
                      className="top-rated-item"
                    >
                      {quickLook === index && !responsive587Px && (
                        <button className="quick-look">Quick look</button>
                      )}
                      <img src={product.image} alt="Product Image" />
                    </div>
                    <div
                      onMouseOver={() => setQuickLook(index)}
                      onMouseLeave={() => setQuickLook(null)}
                      className="top-rated-info"
                    >
                      <h3>{`$${product.salePrice}.99`}</h3>
                      <h6>{`$${product.price}.99`}</h6>
                      <p>{product.title}</p>
                      <span className="review-spacing">
                        <img
                          className="review-stars"
                          src={fourHalfStars}
                          alt="Four And Half Star Review"
                        />
                        <span>77.229</span>
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <h2>Under $25</h2>
        <div className="under-25">
          <div className="under-25-spacing">
            {under25Products
              .filter((product) => product.category_name === currentCategory)
              .map((product, index) => {
                return [
                  <div
                    key={product.id}
                    onClick={() => {
                      setProductId(product.id);
                      navigate(`/products/${product.id}`);
                      window.location.reload();
                    }}
                  >
                    <>
                      <div className="under-25-item-spacing">
                        <div
                          onMouseOver={() => setQuickLook(index)}
                          onMouseLeave={() => setQuickLook(null)}
                          className="under-25-item"
                        >
                          {quickLook === index && (
                            <button className="quick-look">Quick look</button>
                          )}
                          <img src={product.image} alt="Product Image" />
                        </div>
                        <div
                          onMouseOver={() => setQuickLook(index)}
                          onMouseLeave={() => setQuickLook(null)}
                          className="under-25-info"
                        >
                          <h3>{`$${product.salePrice}.99`}</h3>
                          <h6>{`$${product.price}.99`}</h6>
                          <p>{product.title}</p>
                          <span className="review-spacing">
                            <img
                              className="review-stars"
                              src={fourHalfStars}
                              alt="Four And Half Star Review"
                            />
                            <span>77.229</span>
                          </span>
                        </div>
                      </div>
                    </>
                  </div>,
                ];
              })}
          </div>
        </div>

        <h2>Results from {currentCategory}</h2>
        <div className="products-grid">
          {categoryProducts
            .filter((product) => product.category_name === currentCategory)
            .map((product) => {
              return (
                <div
                  onClick={() => {
                    setProductId(product.id);
                    navigate(`/products/${product.id}`);
                    window.location.reload();
                  }}
                  key={product.id}
                  className="products-item"
                >
                  <div className="products-image">
                    <img src={product.image} alt="Product Image" />
                  </div>
                  <div className="description">
                    <p>{product.title}</p>
                    <div className="star-spacing">
                      <img
                        src={fourHalfStars}
                        alt="Four And Half Star Rating"
                      />
                      <span>77.229</span>
                    </div>

                    <h3>{`$${product.salePrice}.90`}</h3>
                    <span className="deliver-to">{`Ships to ${deliverTo}`}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
