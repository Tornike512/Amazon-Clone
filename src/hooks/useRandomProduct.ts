import { useState, useEffect } from "react";

import { TGetProducts } from "@src/@types/RequestTypes";

import axios from "axios";

export function useRandomProduct() {
  const [randomProduct, setRandomProduct] = useState<TGetProducts[]>([]);

  useEffect(() => {
    const fetchRandomProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product?pageSize=40`
        );

        const products = response.data.products;

        if (products.length > 0) {
          const generateRandom = Math.floor(
            Math.random() * response.data.products.length
          );
          const randomProduct = products[generateRandom];

          setRandomProduct(randomProduct);
        }
      } catch (error) {
        console.log("Error Loading Products", error);
      }

      console.log(randomProduct, "random product");
    };

    fetchRandomProduct();
  }, []);

  return randomProduct;
}
