import { Carousel } from "antd";
import useGetProducts from "@src/hooks/useGetProducts";

import "./HomeCarousel.scss";

export function HomeCarousel({ category }: { category: string }) {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const { products } = useGetProducts({ category });

  console.log(products);

  return (
    <Carousel afterChange={onChange}>
      <div>
        <h3 className="content-style">
          {products?.map((product) => {
            return (
              <div key={product.id} className="content-item">
                <img src={product.image} alt="Product Image" />
              </div>
            );
          })}
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
