import { useEffect, useState } from "react";

import { TGetWishlistProducts } from "@src/@types/RequestTypes";

import axios from "axios";

export default function UseGetWishlist() {
  const [wishlist, setWishList] = useState<TGetWishlistProducts[]>([]);

  const token = localStorage.getItem("access_token");

  async function getWishList() {
    const response = await axios.get("http://localhost:3000/liked-products", {
      headers: { Authorization: `bearer ${token}` },
    });

    setWishList(response.data);

    console.log(wishlist);

    try {
    } catch (error) {
      console.log(error, "Couldn't Load Wishlist Items");
    }
  }

  useEffect(() => {
    getWishList();
  }, []);
  return { wishlist };
}
