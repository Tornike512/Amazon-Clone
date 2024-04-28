import axios from "axios";

async function UsePostWishlistProducts({ productId }: { productId: string }) {
  try {
    const response = axios.post("http://localhost:3000/liked-products", {
      product_id: productId,
    });

    return response;
  } catch (error) {
    console.log(error, "Couldn't Load WishList Items");
  }
}

export default UsePostWishlistProducts;
