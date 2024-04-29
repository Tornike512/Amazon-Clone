import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@src/providers/GlobalProvider";

import useGetWishlist from "@src/hooks/useGetWishlist";

import closeIcon from "@src/assets/black-close-icon.png";

import "./WishListModal.scss";

export function WishListModal() {
  const { setWishListModal } = useContext(GlobalContext);

  const navigate = useNavigate();

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

  const { wishlist } = useGetWishlist();

  return (
    <>
      <div className="wishlist-modal-container">
        <ul className="wishlist-modal-header">
          <li>Add to List</li>
          <img onClick={handleCloseButton} src={closeIcon} alt="Close Icon" />
        </ul>
        <ul className="wishlist-item-container">
          <h1>
            1 item added to{" "}
            <a onClick={handleShoppingListNavigation}>Shopping List</a>
          </h1>
          <li className="wishlist-modal-item">
            {wishlist?.map((list) => {
              console.log(list);

              return (
                <div
                  key={list.likedProduct.id}
                  className="wishlist-item-wrapper"
                >
                  <img src={list.likedProduct.image} alt="Product Image" />
                  <p>{list.likedProduct.title}</p>
                </div>
              );
            })}
            <div className="wishlist-modal-navigation">
              <button
                onClick={handleViewYourListButton}
                className="view-your-list"
              >
                View Your List
              </button>
              <button
                onClick={handleContinueShoppingButton}
                className="continue-shopping"
              >
                Continue shopping
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div
        onClick={() => setWishListModal(false)}
        className="wishlist-modal-background"
      ></div>
    </>
  );
}
