import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@src/providers/GlobalProvider";

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

  const navigate = useNavigate();

  const currentCategory = JSON.parse(
    localStorage.getItem("current category") || ""
  );

  async function getProducts() {
    try {
      const response = await axios.get(
        "http://localhost:3000/product?pageSize=100"
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log("Error Loading Products", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (currentCategory === "Computers") {
      setMinSlice(0);
      setMaxSlice(4);
    } else if (currentCategory === "Kitchen") {
      setMinSlice(20);
      setMaxSlice(24);
    }
  }, [currentCategory]);

  const topRatedProducts = products
    .slice()
    .sort((a: any, b: any) => {
      return b - a;
    })
    .slice(minSlice, maxSlice);

  const under25Products = products
    .slice()
    .sort((a: any, b: any) => {
      return b - a;
    })
    .slice(maxSlice, maxSlice + 5);

  const categoryProducts = products
    .slice()
    .sort((a: any, b: any) => {
      return b - a;
    })
    .slice(maxSlice + 4, maxSlice + 16);

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
      <aside className="filter-products">
        <span>Department</span>
        <span className="category">Computers</span>
        <div className="choose-category">
          <a href="#">
            Computer Accessories &<br /> Peripherals
          </a>
          <a href="#">Computer Components</a>
          <a href="#">Computers & Tablets</a>
          <a href="#">Data Storage</a>
          <a href="#">Laptop Accessories</a>
          <a href="#">Monitors</a>
          <a href="#">Networking Products</a>
          <a href="#">Servers</a>
          <a href="#">Tablet Accessories</a>
          <a href="#">Tablet Replacement Parts</a>
        </div>
      </aside>
      <div className="products">
        <h1>{handleCategoryTitle()}</h1>
        <p className="products-description">{handleCategoryDescription()}</p>
        <h2>Top rated</h2>
        <div className="top-rated">
          <div className="top-rated-spacing">
            {topRatedProducts
              .filter((product) => product.category_name === currentCategory)
              .map((product, index) => {
                return (
                  <div
                    style={{
                      height: "280px",
                      marginBottom: "245px",
                      marginRight: "5px",
                      borderRadius: "4px",
                      backgroundColor: "#f7f4f4",
                      cursor: "pointer",
                    }}
                    key={product.id}
                    onClick={() => {
                      setProductId(product.id);
                      navigate(`/products/${product.id}`);
                      setLoading(true);
                    }}
                  >
                    <div
                      onMouseOver={() => setQuickLook(index)}
                      onMouseLeave={() => setQuickLook(null)}
                      className="top-rated-item"
                    >
                      {quickLook === index && (
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
                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      setProductId(product.id);
                      navigate(`/products/${product.id}`);
                    }}
                  >
                    {product.price <= 25 && (
                      <>
                        <div>
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
                    )}
                  </div>
                );
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

                    <h3>{`$${product.price}.90`}</h3>
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
