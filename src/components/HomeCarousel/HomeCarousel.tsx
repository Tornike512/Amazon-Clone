import { Carousel, Button } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import useGetProducts from "@src/hooks/useGetProducts";

import rightArrow from "@src/assets/right-arrow.png";
import leftArrow from "@src/assets/left-arrow.png";

import "./HomeCarousel.scss";

export function HomeCarousel({ category }: { category: string }) {
  const ref = useRef<any>(null);

  const navigate = useNavigate();

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const { products } = useGetProducts({ category });
  return (
    <div className="carousel-container">
      <h2 className="carousel-category">{category}</h2>
      <Carousel ref={ref} afterChange={onChange}>
        <div>
          <h3 className="content-style">
            {products?.slice(0, 5).map((product) => {
              return (
                <>
                  <div key={product.id} className="content-item">
                    <img
                      onClick={() => {
                        navigate(`./products/${product.id}`);
                        localStorage.setItem(
                          "current category",
                          JSON.stringify(category)
                        );
                        window.location.reload();
                      }}
                      src={product.image}
                      alt="Product Image"
                    />
                  </div>
                </>
              );
            })}
          </h3>
        </div>
        <div>
          <h3 className="content-style">
            {products?.slice(5, 11).map((product) => {
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
