import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsCarousel } from "@src/features/ProductsCarousel";
import { Loader } from "@src/components/Loader";
import cartPostRequest from "@src/utils/CartPostRequest";

import { TGetProducts } from "@src/@types/RequestTypes";

import fourAndHalf from "@src/assets/four-half-stars.png";
import leftArrow from "@src/assets/left-arrow.png";
import alertIcon from "@src/assets/alert-icon.png";
import locationLogoBlack from "@src/assets/location-logo-black.png";
import successIcon from "@src/assets/success-icon.png";

import axios from "axios";

import "./OneProductPage.scss";

export function OneProductPage() {
  const {
    productId,
    setProductId,
    deliverTo,
    loading,
    setLoading,
    products,
    setProducts,
    countCartProducts,
    setCountCartProducts,
    subtotal,
    setSubtotal,
    countProducts,
    setCountProducts,
  } = useContext(GlobalContext);

  const [oneProduct, setOneProduct] = useState<TGetProducts | null>(null);
  const [cartAdded, setCartAdded] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [firstSponsored, setFirstSponsored] = useState<TGetProducts | null>(
    null
  );
  const [SecondSponsored, setSecondSponsored] = useState<TGetProducts | null>(
    null
  );

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  async function getOneProduct() {
    try {
      const response = await axios.get(
        `http://localhost:3000/product?pageSize=40`
      );

      setProducts(response.data.products);
      const products = response.data.products;

      if (products.length > 0) {
        const randomIndex = Math.floor(Math.random() * products.length - 1);
        setFirstSponsored(products[randomIndex]);
        setSecondSponsored(products[randomIndex + 1]);
      }

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
  console.log(countCartProducts);

  useEffect(() => {
    if (id) {
      getOneProduct();
      setProductId(id);
    }
  }, [id]);

  const percentage =
    100 -
    Math.round(((oneProduct?.salePrice || 0) * 100) / (oneProduct?.price || 1));

  async function addToCart() {
    try {
      await cartPostRequest(productId, token);
      setCountCartProducts(countCartProducts + 1);
    } catch (error) {
      console.log("Error Loading Cart Products", error);
    }
  }

  const firstSponsoredNav = () => {
    navigate(`/products/${firstSponsored?.id}`);
    window.location.reload();
  };

  const secondSponsoredNav = () => {
    navigate(`/products/${SecondSponsored?.id}`);
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
                addToCart();
                setLoader(true);
                setTimeout(() => {
                  setCartAdded(true);
                  setLoader(false);
                }, 1000);
              }}
              className="add-to-cart"
            >
              Add to Cart
            </button>
            {loader && (
              <>
                <Loader />
              </>
            )}
            {cartAdded && (
              <span className="cart-added">
                <img src={successIcon} alt="Success Icon" />
                <span>Added to Cart</span>
              </span>
            )}
            <button
              onClick={() => {
                navigate("/purchase");
                addToCart();
              }}
              className="buy-now"
            >
              Buy Now
            </button>
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

        <div className="sponsored-ad">
          <div
            onClick={() => {
              firstSponsoredNav();
            }}
            className="sponsored-item-spacing"
          >
            <span className="sponsored-item">
              <img
                className="sponsored-item-image"
                src={firstSponsored?.image}
                alt="Product Image"
              />
              <span>
                <p>{firstSponsored?.title}</p>
                <span className="rating-price-spacing">
                  <span className="rating-spacing">
                    <img src={fourAndHalf} alt="Rating Stars Image" />
                    <span>72,274</span>
                  </span>
                  <h6>{`$${firstSponsored?.salePrice}.99`}</h6>
                </span>
              </span>
            </span>
          </div>
          <div
            onClick={() => secondSponsoredNav()}
            className="sponsored-item-spacing"
          >
            <span className="sponsored-item">
              <img
                className="sponsored-item-image"
                src={SecondSponsored?.image}
                alt="Product Image"
              />
              <span>
                <p>{SecondSponsored?.title}</p>
                <span className="rating-price-spacing">
                  <span className="rating-spacing">
                    <img src={fourAndHalf} alt="Rating Stars Image" />
                    <span>72,274</span>
                  </span>
                  <h6>{`$${SecondSponsored?.salePrice}.99`}</h6>
                </span>
              </span>
            </span>
          </div>
        </div>

        <ProductsCarousel products={products} />
      </div>
    </div>
  );
}
