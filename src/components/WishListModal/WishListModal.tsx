import closeIcon from "@src/assets/black-close-icon.png";
import randomitem from "@src/assets/beauty-products.jpg";

import "./WishListModal.scss";

export function WishListModal() {
  return (
    <>
      <div className="wishlist-modal-container">
        <ul className="wishlist-modal-header">
          <li>Add to List</li>
          <img src={closeIcon} alt="Close Icon" />
        </ul>
        <ul className="wishlist-item-container">
          <h1>
            1 item added to <a href="#">Shopping List</a>
          </h1>
          <li className="wishlist-modal-item">
            <div className="wishlist-item-wrapper">
              <img src={randomitem} alt="Product Image" />
              <p>
                LC406XL Ink Cartridges Compatible for Brother LC406XL LC406 High
                Yield Work with Brother MFC-J4535DW MFC-J4335DW MFC-J5855DW
                MFC-J6555DW MFC-J6955DW Printer(Black, Cyan, Magenta, Yellow, 4
                Pack)
              </p>
            </div>
            <div className="wishlist-modal-navigation">
              <button className="view-your-list">View Your List</button>
              <button className="continue-shopping">Continue shopping</button>
            </div>
          </li>
        </ul>
      </div>
      <div className="wishlist-modal-background"></div>
    </>
  );
}
