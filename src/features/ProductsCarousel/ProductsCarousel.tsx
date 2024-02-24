import { TGetProducts } from "@src/@types/RequestTypes";

import rightArrow from "@src/assets/right-arrow.png";
import leftArrow from "@src/assets/left-arrow.png";

interface TProductsCarousel {
  item: TGetProducts;
}

export function ProductsCarousel({ item }: TProductsCarousel) {
  return (
    <div className="carousel">
      <div className="carousel-item">
        <img src="" alt="Carousel Product Image" />
        <p className="carousel-product-title"></p>
        <span>
          <img src="" alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>price</h4>
      </div>
      <div className="carousel-item">
        <img src="" alt="Carousel Product Image" />
        <p className="carousel-product-title"></p>
        <span>
          <img src="" alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>price</h4>
      </div>
      <div className="carousel-item">
        <img src="" alt="Carousel Product Image" />
        <p className="carousel-product-title"></p>
        <span>
          <img src="" alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>price</h4>
      </div>
      <div className="carousel-item">
        <img src="" alt="Carousel Product Image" />
        <p className="carousel-product-title"></p>
        <span>
          <img src="" alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>price</h4>
      </div>
      <div className="carousel-item">
        <img src="" alt="Carousel Product Image" />
        <p className="carousel-product-title"></p>
        <span>
          <img src="" alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>price</h4>
      </div>
      <div className="carousel-item">
        <img src="" alt="Carousel Product Image" />
        <p className="carousel-product-title"></p>
        <span>
          <img src="" alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>price</h4>
      </div>
      <div className="carousel-item">
        <img src="" alt="Carousel Product Image" />
        <p className="carousel-product-title"></p>
        <span>
          <img src="" alt="Carousel Product Rating" />
          <span>72,274</span>
        </span>
        <h4>price</h4>
      </div>
      <img src={rightArrow} alt="Right Arrow" />
      <img src={leftArrow} alt="Left Arrow" />
    </div>
  );
}
