import { useState, useEffect } from "react";

import { TGetProducts } from "@src/@types/RequestTypes";

import axios from "axios";

export default function useGetProducts({ category }: { category: string }) {
  const [products, setProducts] = useState<TGetProducts[]>([]);

  async function getProducts() {
    try {
      const response = await axios.get(
        `http://localhost:3000/product?categoryName=${category}`
      );

      setProducts(response.data.products);
    } catch (error) {
      console.log("Error Loading Categories", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return { products };
}
