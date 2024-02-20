import { useEffect, useContext } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";

import fourHalfStar from "@src/assets/four-half-star.png";

import axios from "axios";

import "./ProductsPage.scss";

export function ProductsPage() {
  const { products, setProducts } = useContext(GlobalContext);

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setProducts(response.data.products);
    } catch (error) {
      console.log("Error Loading Products", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="products-page">
      <div className="filter-products">
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
      </div>
      <div className="products">
        <h1>Computers, Tablets and IT Accessories</h1>
        <p className="products-description">
          Shop laptops, desktops, monitors, tablets, PC gaming, hard drives and
          storage, accessories and more
        </p>
        <h2>Top rated</h2>
        <div className="top-rated-grid">
          <div>
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <div className="top-rated-item">
                    <img src={product.image} alt="Product Image" />
                  </div>
                  <>
                    <div className="top-rated-info">
                      <h3>{`$${product.price}.99`}</h3>
                      <h6>{`$${product.salePrice}.99`}</h6>
                      <p>{product.title}</p>
                      <span className="review-spacing">
                        <img
                          className="review-stars"
                          src={fourHalfStar}
                          alt="Four And Half Star Review"
                        />
                        <span>77.229</span>
                      </span>
                    </div>
                  </>
                </div>
              );
            })}
          </div>

          <div className="top-rated-item">
            <div className="top-rated-info"></div>
          </div>
          <div className="top-rated-item">
            <div className="top-rated-info"></div>
          </div>
          <div className="top-rated-item">
            <div className="top-rated-info"></div>
          </div>
        </div>

        <h2>Under $25</h2>
        <div className="under-25-grid">
          <div className="under-25-item"></div>
          <div className="under-25-item"></div>
          <div className="under-25-item"></div>
          <div className="under-25-item"></div>
        </div>

        <div className="product-grid">
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
        </div>
      </div>
    </div>
  );
}
