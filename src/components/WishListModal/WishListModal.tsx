import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { FormattedMessage, useIntl } from "react-intl";

import useGetWishlist from "@src/hooks/useGetWishlist";

import closeIcon from "@src/assets/black-close-icon.png";

import "./WishListModal.scss";

export function WishListModal({ one_product }: { one_product: string }) {
  const { setWishListModal, wishlistModal } = useContext(GlobalContext);

  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  const { wishlist } = useGetWishlist();

  const filterWishlist = wishlist.filter((item) => {
    return item.likedProduct.id === one_product;
  });

  const handleCloseButton = () => {
    setWishListModal(false);
  };

  const handleShoppingListNavigation = () => {
    navigate("/wishlist");
  };

  const handleViewYourListButton = () => {
    setWishListModal(false);
    navigate("/wishlist");
  };

  const handleContinueShoppingButton = () => {
    setWishListModal(false);
  };

  const addedWishlist = JSON.parse(
    localStorage.getItem("added wishlist") || "[]"
  );

  return (
    <>
      <div className="wishlist-modal-container">
        <ul className="wishlist-modal-header">
          <li>
            <FormattedMessage id="add to list" />
          </li>
          <img onClick={handleCloseButton} src={closeIcon} alt="Close Icon" />
        </ul>
        <ul className="wishlist-item-container">
          {addedWishlist ? (
            <h1>
              <FormattedMessage id="this item was already in" />{" "}
              <a onClick={handleShoppingListNavigation}>
                <FormattedMessage id="shopping list" />
              </a>
            </h1>
          ) : (
            <h1>
              <FormattedMessage id="1 item added to" />{" "}
              <a onClick={handleShoppingListNavigation}>
                <FormattedMessage id="shopping list" />
              </a>
            </h1>
          )}
          {filterWishlist.map((list) => {
            return (
              <li key={list.likedProduct.id} className="wishlist-modal-item">
                <div className="wishlist-item-wrapper">
                  <img src={list.likedProduct.image} alt="Product Image" />
                  <p>
                    <FormattedMessage id={list.likedProduct.title} />
                  </p>
                </div>

                <div className="wishlist-modal-navigation">
                  <button
                    onClick={handleViewYourListButton}
                    className="view-your-list"
                  >
                    <FormattedMessage id="view your list" />
                  </button>
                  <button
                    onClick={handleContinueShoppingButton}
                    className="continue-shopping"
                  >
                    <FormattedMessage id="continue shopping" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        onClick={() => setWishListModal(false)}
        className="wishlist-modal-background"
      ></div>
    </>
  );
}
