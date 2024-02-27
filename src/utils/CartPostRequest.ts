import { useState, useEffect } from "react";

import axios from "axios";

interface TProductId {
  product_id: string;
}

export function useCartProduct({ product_id }: TProductId) {
  const [cartProduct, setCartProduct] = useState<TProductId[] | null>([]);

  useEffect(() => {
    async function fetchCartProduct() {
      try {
        const response = await axios.post(
          `http://localhost:3000/cart/${product_id}`,
          {
            product_id: "",
          }
        );
        setCartProduct(response.data.products);
        console.log(cartProduct);
      } catch (error) {
        console.log("Error Loading Cart Product", error);
      }
    }

    fetchCartProduct();
  }, [product_id]);

  return cartProduct;
}
