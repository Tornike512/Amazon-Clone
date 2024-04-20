import { Carousel, Button } from "antd";
import { useRef } from "react";

import useGetProducts from "@src/hooks/useGetProducts";

import "./HomeCarousel.scss";

export function HomeCarousel({ category }: { category: string }) {
  const reft = useRef();

  const onChange = (currentSlide: number) => {
    console.log(currentSlide, "hello");
  };

  const { products } = useGetProducts({ category });

  return (
    <Carousel afterChange={onChange}>
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
        <Button className="switch-button">prev</Button>
        <Button>next</Button>
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
  );
}
