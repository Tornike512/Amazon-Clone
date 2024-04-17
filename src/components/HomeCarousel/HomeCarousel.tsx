import { Carousel } from "antd";
import useGetProducts from "@src/hooks/useGetProducts";

import "./HomeCarousel.scss";

export function HomeCarousel() {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const { purchaseProducts } = usePurchaseProducts();

  console.log(purchaseProducts);

  return (
    <Carousel afterChange={onChange}>
      <div>
        <h3 className="content-style">
          <div className="content-item">1</div>
          <div className="content-item">2</div>
          <div className="content-item">3</div>
          <div className="content-item">4</div>
          <div className="content-item">5</div>
          <div className="content-item">6</div>
          <div className="content-item">7</div>
        </h3>
      </div>
      <div>
        <h3 className="content-style">2</h3>
      </div>
      <div>
        <h3 className="content-style">3</h3>
      </div>
      <div>
        <h3 className="content-style">4</h3>
      </div>
    </Carousel>
  );
}
