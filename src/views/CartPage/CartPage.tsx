import "./CartPage.scss";

export function CartPage() {
  return (
    <div className="cart-page">
      <div className="cart">
        <div className="shopping-cart">
          <h1>Shopping Cart</h1>
          <span>Deselect all items</span>
          <span>Price</span>
          <div className="cart-product">
            <input type="checkBox" />
            <img src="" alt="Product-image" />
            <div className="cart-product-info">
              <p className="cart-product-title"></p>
              <span>In Stock</span>
              <span className="cart-quantity">
                <select name="" id="">
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                </select>
                <span>Delete</span>
                <span>Save for later</span>
              </span>
            </div>
            <span className="cart-product-price">$21.99</span>
          </div>
          <span className="cart-product-subtotal">Subtotal 1 item $21.99</span>
        </div>
        <div className="subtotal">
          <span className="subtotal-price">subtotal 1 item $21.99</span>
          <button className="checkout">Proceed to checkout</button>
        </div>
      </div>
      <div className="save-for-later">
        <h2>Your items</h2>
        <span>No items saved for later</span>
        <div className="saved-for-later-product">
          <img src="" alt="Saved For Later Image" />
          <p className="saved-for-later-title"></p>
          <span>$21.99</span>
          <span>In Stock</span>
          <button className="move-to-cart">Move to cart</button>
          <span>Delete</span>
          <span>Add to list</span>
        </div>
      </div>
    </div>
  );
}
