import "./ProductsPage.scss";

export function ProductsPage() {
  return (
    <div className="products-page">
      <div className="filter-products">
        <span>Department</span>
        <span>Computers</span>
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
      <div className="products"></div>
    </div>
  );
}
