import { Carousel, Button } from "antd";
import { useRef } from "react";

import useGetProducts from "@src/hooks/useGetProducts";

import rightArrow from "@src/assets/right-arrow.png";
import leftArrow from "@src/assets/left-arrow.png";

import "./HomeCarousel.scss";

export function HomeCarousel({ category }: { category: string }) {
  const ref = useRef<any>(null);
  console.log(ref);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide, "hello");
  };

  const { products } = useGetProducts({ category });

  return (
    <div className="carousel-spacing">
      <Carousel ref={ref} afterChange={onChange}>
        <div>
          <h3 className="content-style">
            {products?.slice(0, 5).map((product) => {
              return (
                <>
                  <div key={product.id} className="content-item">
                    <img src={product.image} alt="Product Image" />
                  </div>
                </>
              );
            })}
          </h3>
        </div>
        <div>
          <h3 className="content-style">
            {products?.slice(5, 11).map((product) => {
              console.log(products);

              return (
                <>
                  <div key={product.id} className="content-item">
                    <img src={product.image} alt="Product Image" />
                  </div>
                </>
              );
            })}
          </h3>
        </div>
      </Carousel>
      <Button onClick={() => ref.current?.prev()} className="left-switch">
        <img src={leftArrow} alt="Left Arrow" />
      </Button>
      <Button onClick={() => ref.current?.next()} className="right-switch">
        <img src={rightArrow} alt="Right Arrow" />
      </Button>
    </div>
  );
}
