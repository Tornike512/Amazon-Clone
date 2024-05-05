import { useEffect, useState, useContext } from "react";

import { GlobalContext } from "@src/providers/GlobalProvider";
import { TGetWishlistProducts } from "@src/@types/RequestTypes";

import axios from "axios";

export default function UseGetWishlist() {
  const [wishlist, setWishList] = useState<TGetWishlistProducts[]>([]);

  const token = localStorage.getItem("access_token");

  async function getWishList() {
    try {
      const response = await axios.get("http://localhost:3000/liked-products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishList(response.data);
    } catch (error) {
      console.log(error, "Couldn't Load Wishlist Items");
    }
  }

  useEffect(() => {
    getWishList();
  }, [wishlist]);
  return { wishlist };
}
