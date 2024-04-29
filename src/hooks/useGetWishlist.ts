import { useEffect, useState } from "react";

import { TGetProducts } from "@src/@types/RequestTypes";

import axios from "axios";

export default function UseGetWishlist() {
  const [wishlist, setWishList] = useState<TGetProducts[]>([]);

  async function getWishList() {
    const response = await axios.get("http://localhost:3000/liked-products");

    setWishList(response.data);

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
