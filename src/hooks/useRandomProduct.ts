import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TGetProducts } from "@src/@types/RequestTypes";

import axios from "axios";

export function useRandomProduct(): TGetProducts | null {
  const [randomProduct, setRandomProduct] = useState<TGetProducts | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchRandomProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product?pageSize=40`
        );

        const products = response.data.products;

        if (products.length > 0) {
          const randomIndex = Math.floor(Math.random() * products.length);
          setRandomProduct(products[randomIndex]);
        }
      } catch (error) {
        console.log("Error Loading Products", error);
      }
    };

    fetchRandomProduct();
  }, []);

  return randomProduct || null;
}
