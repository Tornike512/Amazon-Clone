import { TGetProducts } from "@src/@types/RequestTypes";

import fourAndFiveStart from "@src/assets/four-half-stars.png";
import rightArrow from "@src/assets/right-arrow.png";
import leftArrow from "@src/assets/left-arrow.png";

import "./ProductsCarousel.scss";

interface TProductsCarousel {
  item: TGetProducts;
}

export function ProductsCarousel({ item }: TProductsCarousel) {
  return (
    <div className="carousel">
      <div key={item.id} className="carousel-item">
        <img src={item.image} alt="Carousel Product Image" />
        <p className="carousel-product-title">{item.title}</p>
        <span>
          <img src={fourAndFiveStart} alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>{item.salePrice}</h4>
      </div>
      <div key={item.id} className="carousel-item">
        <img src={item.image} alt="Carousel Product Image" />
        <p className="carousel-product-title">{item.title}</p>
        <span>
          <img src={fourAndFiveStart} alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>{item.salePrice}</h4>
      </div>
      <div key={item.id} className="carousel-item">
        <img src={item.image} alt="Carousel Product Image" />
        <p className="carousel-product-title">{item.title}</p>
        <span>
          <img src={fourAndFiveStart} alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>{item.salePrice}</h4>
      </div>
      <div key={item.id} className="carousel-item">
        <img src={item.image} alt="Carousel Product Image" />
        <p className="carousel-product-title">{item.title}</p>
        <span>
          <img src={fourAndFiveStart} alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>{item.salePrice}</h4>
      </div>
      <div key={item.id} className="carousel-item">
        <img src={item.image} alt="Carousel Product Image" />
        <p className="carousel-product-title">{item.title}</p>
        <span>
          <img src={fourAndFiveStart} alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>{item.salePrice}</h4>
      </div>
      <div key={item.id} className="carousel-item">
        <img src={item.image} alt="Carousel Product Image" />
        <p className="carousel-product-title">{item.title}</p>
        <span>
          <img src={fourAndFiveStart} alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>{item.salePrice}</h4>
      </div>
      <div key={item.id} className="carousel-item">
        <img src={item.image} alt="Carousel Product Image" />
        <p className="carousel-product-title">{item.title}</p>
        <span>
          <img src={fourAndFiveStart} alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>{item.salePrice}</h4>
      </div>

      <img src={rightArrow} alt="Right Arrow" />
      <img src={leftArrow} alt="Left Arrow" />
    </div>
  );
}
