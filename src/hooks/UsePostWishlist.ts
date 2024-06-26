import axios from "axios";

async function UsePostWishlistProducts({
  productId,
  token,
}: {
  productId: string;
  token: string | null;
}) {
  try {
    const response = await axios.post(
      "https://amazon-clone-api-8bme.onrender.com/liked-products",
      {
        product_id: productId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    console.log(error, "Couldn't Load WishList Items");
  }
}

export default UsePostWishlistProducts;
