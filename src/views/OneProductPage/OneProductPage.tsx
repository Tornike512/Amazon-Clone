import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsCarousel } from "@src/features/ProductsCarousel";
import { Loader } from "@src/components/Loader";
import { WishListModal } from "@src/components/WishListModal";
import UsePostWishlistProducts from "@src/hooks/UsePostWishlist";
import cartPostRequest from "@src/utils/CartPostRequest";
import useGetWishlist from "@src/hooks/useGetWishlist";
import { FormattedMessage } from "react-intl";

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
    setLoading,
    products,
    setProducts,
    countCartProducts,
    setCountCartProducts,
    currentCategory,
    setWishListModal,
    wishlistModal,
    setAddedWishlist,
    addedWishlist,
    setWishlistProduct,
  } = useContext(GlobalContext);

  const [oneProduct, setOneProduct] = useState<TGetProducts | any>(null);
  const [cartAdded, setCartAdded] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [firstSponsored, setFirstSponsored] = useState<TGetProducts | null>(
    null
  );
  const [SecondSponsored, setSecondSponsored] = useState<TGetProducts | null>(
    null
  );
  const [oneProductTitle, setOneProductTitle] = useState<any>("");
  const [oneProductDescription, setOneProductDescription] = useState<any>("");

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  async function getOneProduct() {
    try {
      if (currentCategory !== "Toys & Games") {
        const response = await axios.get(
          `http://localhost:3000/product?pageSize=35&categoryName=${currentCategory}`
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
        setOneProductTitle(<FormattedMessage id={product.title} />);
        setOneProductDescription(<FormattedMessage id={product.description} />);
      } else {
        const response = await axios.get(
          `http://localhost:3000/product?pageSize=35&categoryName=Toys %26 Games`
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
        setOneProductTitle(<FormattedMessage id={product.title} />);
        setOneProductDescription(<FormattedMessage id={product.description} />);
      }
    } catch (error) {
      console.log("Error Loading Product", error);
    } finally {
      setLoading(false);
    }
  }

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

  const { wishlist } = useGetWishlist();

  async function addToWishlist(id: string) {
    const wishlistId = wishlist.map((list) => {
      return list.likedProduct.id;
    });

    if (wishlistId.includes(id)) {
      setAddedWishlist(true);
    } else {
      setAddedWishlist(false);
      await UsePostWishlistProducts({ productId: id, token });
    }
  }

  useEffect(() => {
    localStorage.setItem("added wishlist", JSON.stringify(addedWishlist));
  }, [addedWishlist]);

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
            <FormattedMessage id="back to results" />
          </a>
        </span>
        <div className="one-product-info">
          <div className="product-image">
            <img src={oneProduct?.image} alt="Product Image" />
          </div>
          <div className="product-title">
            <h1>{oneProductTitle}</h1>
            <span className="one-product-rating">
              <span>4.5</span>
              <img src={fourAndHalf} alt="Four And Half Stars" />
              <span>
                <FormattedMessage id="72,274 ratings" />
              </span>
            </span>
            <h2 className="price">
              <span className="sale">{`-${percentage}%`}</span>
              {`$${oneProduct?.salePrice}.99`}
            </h2>
            <span className="typical-price">
              <FormattedMessage id="typical price" />{" "}
              <span>{`$${oneProduct?.price}.99`}</span>
            </span>
            <p className="one-product-alert">
              <img src={alertIcon} alt="Alert Icon" />
              <FormattedMessage id="use amazon currency converter at checkout to pay for this item in your local currency. terms & conditions apply." />
            </p>
            <p className="one-product-note">
              <FormattedMessage id="available at a lower price from other sellers that may not offer free prime shipping." />
            </p>
            <h3 className="about-this-item">
              <FormattedMessage id="about this item" />
            </h3>
            <ul className="description">
              <li>{oneProductDescription}</li>
            </ul>
          </div>
          <div className="buy">
            <h2 className="buy-price">{`$${oneProduct?.salePrice}.99`}</h2>
            <p className="delivery-time">
              <FormattedMessage id="delivery order within 6 hrs 8 min" />
            </p>
            <span className="deliver-to">
              <img src={locationLogoBlack} alt="Location Logo" />
              <a href="#">
                Deliver to <FormattedMessage id="united states" />
              </a>
            </span>
            <h2 className="in-stock">
              <FormattedMessage id="in stock" />
            </h2>
            <select className="select-quantity" name="quantity" id="quantity">
              <option value="1">
                <FormattedMessage id="quantity:" /> 1
              </option>
              <option value="2">
                <FormattedMessage id="quantity:" /> 2
              </option>
              <option value="3">
                <FormattedMessage id="quantity:" /> 3
              </option>
              <option value="4">
                <FormattedMessage id="quantity:" /> 4
              </option>
              <option value="5">
                <FormattedMessage id="quantity:" /> 5
              </option>
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
              <FormattedMessage id="add to cart" />
            </button>
            {loader && (
              <>
                <Loader />
              </>
            )}
            {cartAdded && (
              <span className="cart-added">
                <img src={successIcon} alt="Success Icon" />
                <span>
                  <FormattedMessage id="added to cart" />
                </span>
              </span>
            )}
            <button
              onClick={() => {
                navigate("/purchase");
                addToCart();
              }}
              className="buy-now"
            >
              <FormattedMessage id="buy now" />
            </button>
            <span className="ships-from">
              <span>
                <FormattedMessage id="ships from" />
              </span>
              <span>Amazon.com</span>
            </span>
            <span className="sold-by">
              <span>
                <FormattedMessage id="sold by" />
              </span>
              <span>Amazon.com</span>
            </span>
            <button
              onClick={() => {
                setTimeout(() => {
                  setWishListModal(true);
                }, 500);
                addToWishlist(oneProduct?.id);
                setWishlistProduct(oneProduct?.id);
              }}
              className="add-to-list"
            >
              <FormattedMessage id="add to list" />
            </button>
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
      {wishlistModal && <WishListModal one_product={oneProduct.id} />}
    </div>
  );
}
