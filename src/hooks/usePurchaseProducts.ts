import { useState, useEffect } from "react";
import { TCartProducts } from "@src/@types/RequestTypes";

import axios from "axios";

export function usePurchaseProducts() {
  const [purchaseProducts, setPurchaseProducts] = useState<TCartProducts[]>([]);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    async function purchaseItems() {
      try {
        const response = await axios.get("http://localhost:3000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPurchaseProducts(response.data);
      } catch (error) {
        console.log("Error Loading Products To Purchase", error);
      }
    }

    if (token) {
      purchaseItems();
    }
  }, [token]);

  return { purchaseProducts };
}
