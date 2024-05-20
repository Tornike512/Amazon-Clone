import axios from "axios";

async function wishlitDeleteRequest({ item }: { item: string }) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.delete(
      `https://amazon-clone-api-8bme.onrender.com/liked-products/${item}`,
      { headers: { Authorization: `bearer ${token}` } }
    );
    console.log(item);

    return response.data;
  } catch (error) {
    console.log(error, "Error Deleting Wishlist Product");
  }
}

export default wishlitDeleteRequest;
