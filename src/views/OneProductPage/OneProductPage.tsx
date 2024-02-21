import "./OneProductPage.scss";

export function OneProductPage() {
  return (
    <div>
      <span>
        <img src="" alt="Left Arrow" />
        <span>Back to results</span>
      </span>
      <div>
        <img src="" alt="" />
        <div>
          <h1></h1>
          <span>
            <span>4.5</span>
            <img src="" alt="" />
            <span>72,274 ratings</span>
          </span>
          <h2></h2>
          <span>Typical price</span>
          <p>
            Use Amazon Currency Converter at checkout to pay for this item in
            your local currency. Terms & Conditions apply. Learn More Available
            at a lower price from other sellers that may not offer free Prime
            shipping.
          </p>
          <h3>About this item</h3>
          <p></p>
        </div>
        <p>
          Note: Products with electrical plugs are designed for use in the US.
          Outlets and voltage differ internationally and this product may
          require an adapter or converter for use in your destination. Please
          check compatibility before purchasing.
        </p>
      </div>

      <div className="buy">
        <h2>29.99$</h2>
        <p>Delivery order within 6 hrs 8 min</p>
        <span>
          <img src="" alt="" />
          <a href="#">delivery to georgia</a>
        </span>
        <h2>In Stock</h2>
        <select name="quantity" id="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button>Add to Cart</button>
        <button>Buy Now</button>
        <span>
          <span>Ships from</span>
          <span>Amazon.com</span>
        </span>
        <span>
          <span>sold by</span>
          <span>Amazon.com</span>
        </span>
        <button>Add to List</button>
      </div>
    </div>
  );
}
