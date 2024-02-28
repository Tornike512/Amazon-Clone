import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useRandomProduct } from "@src/hooks/useRandomProduct";
import { ProductsCarousel } from "@src/features/ProductsCarousel";
import { useCartProduct } from "@src/utils/CartPostRequest";

import { TGetProducts } from "@src/@types/RequestTypes";

import fourAndHalf from "@src/assets/four-half-stars.png";
import leftArrow from "@src/assets/left-arrow.png";
import alertIcon from "@src/assets/alert-icon.png";
import locationLogoBlack from "@src/assets/location-logo-black.png";

import axios from "axios";

import "./OneProductPage.scss";

export function OneProductPage() {
  const { productId, setProductId, deliverTo, loading, setLoading, products } =
    useContext(GlobalContext);

  const [oneProduct, setOneProduct] = useState<TGetProducts | null>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const randomProduct = useRandomProduct();
  const secondRandomProduct = useRandomProduct();

  const token = localStorage.getItem("access_token");

  async function getOneProduct() {
    try {
      const response = await axios.get(
        `http://localhost:3000/product?pageSize=40`
      );
      const product = response.data.products.find(
        (product: TGetProducts) => product.id === id
      );
      setOneProduct(product);
    } catch (error) {
      console.log("Error Loading Product", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOneProduct();
  }, []);

  const percentage =
    100 -
    Math.round(((oneProduct?.salePrice || 0) * 100) / (oneProduct?.price || 1));

  async function addToCart() {
    try {
      const response = await axios.post(
        `http://localhost:3000/cart`,
        {
          product_id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Error Adding Product To Cart", error);
    }
  }

  const sponsoredSecondNav = () => {
    navigate(`/products/${secondRandomProduct?.id}`);
    window.location.reload();
  };

  const sponsoredNav = () => {
    navigate(`/products/${randomProduct?.id}`);
    window.location.reload();
  };

  return (
    <div className="one-product-page">
      <div className="one-product-spacing" key={oneProduct?.id}>
        <span className="back-to-results">
          <img src={leftArrow} alt="Left Arrow" />
          <a
            onClick={() => {
              navigate("/products");
              setLoading(true);
            }}
          >
            Back to results
          </a>
        </span>
        <div className="one-product-info">
          <div className="product-image">
            <img src={oneProduct?.image} alt="Product Image" />
          </div>
          <div className="product-title">
            <h1>{oneProduct?.title}</h1>
            <span className="one-product-rating">
              <span>4.5</span>
              <img src={fourAndHalf} alt="Four And Half Stars" />
              <span>72,274 ratings</span>
            </span>
            <h2 className="price">
              <span className="sale">{`-${percentage}%`}</span>
              {`$${oneProduct?.salePrice}.99`}
            </h2>
            <span className="typical-price">
              Typical price <span>{`$${oneProduct?.price}.99`}</span>
            </span>
            <p className="one-product-alert">
              <img src={alertIcon} alt="Alert Icon" />
              Use Amazon Currency Converter at checkout to pay for this item in
              your local currency. Terms & Conditions apply.
            </p>
            <p className="one-product-note">
              Available at a lower price from other sellers that may not offer
              free Prime shipping.
            </p>
            <h3 className="about-this-item">About this item</h3>
            <ul className="description">
              <li>{oneProduct?.description}</li>
            </ul>
          </div>
          <div className="buy">
            <h2 className="buy-price">{`$${oneProduct?.salePrice}.99`}</h2>
            <p className="delivery-time">Delivery order within 6 hrs 8 min</p>
            <span className="deliver-to">
              <img src={locationLogoBlack} alt="Location Logo" />
              <a href="#">{`Deliver to ${deliverTo}`}</a>
            </span>
            <h2 className="in-stock">In Stock</h2>
            <select className="select-quantity" name="quantity" id="quantity">
              <option value="1">Quantity: 1</option>
              <option value="2">Quantity: 2</option>
              <option value="3">Quantity: 3</option>
              <option value="4">Quantity: 4</option>
              <option value="5">Quantity: 5</option>
            </select>
            <button
              onClick={() => {
                navigate("/cart");
                addToCart();
                if (id) {
                  setProductId(id);
                }
              }}
              className="add-to-cart"
            >
              Add to Cart
            </button>
            <button className="buy-now">Buy Now</button>
            <span className="ships-from">
              <span>Ships from</span>
              <span>Amazon.com</span>
            </span>
            <span className="sold-by">
              <span>Sold by</span>
              <span>Amazon.com</span>
            </span>
            <button className="add-to-list">Add to List</button>
          </div>
        </div>
        {randomProduct && (
          <div className="sponsored-ad">
            <div
              onClick={() => sponsoredNav()}
              className="sponsored-item-spacing"
            >
              <span className="sponsored-item">
                <img
                  className="sponsored-item-image"
                  src={randomProduct?.image}
                  alt="Product Image"
                />
                <span>
                  <p>{randomProduct?.title}</p>
                  <span className="rating-price-spacing">
                    <span className="rating-spacing">
                      <img src={fourAndHalf} alt="Rating Stars Image" />
                      <span>72,274</span>
                    </span>
                    <h6>{`$${randomProduct?.salePrice}.99`}</h6>
                  </span>
                </span>
              </span>
            </div>
            <div
              onClick={() => sponsoredSecondNav()}
              className="sponsored-item-spacing"
            >
              <span className="sponsored-item">
                <img
                  className="sponsored-item-image"
                  src={secondRandomProduct?.image}
                  alt="Product Image"
                />
                <span>
                  <p>{secondRandomProduct?.title}</p>
                  <span className="rating-price-spacing">
                    <span className="rating-spacing">
                      <img src={fourAndHalf} alt="Rating Stars Image" />
                      <span>72,274</span>
                    </span>
                    <h6>{`$${secondRandomProduct?.salePrice}.99`}</h6>
                  </span>
                </span>
              </span>
            </div>
          </div>
        )}
        <ProductsCarousel />
      </div>
    </div>
  );
}
