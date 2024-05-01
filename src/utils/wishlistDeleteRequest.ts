import axios from "axios";

async function wishlitDeleteRequest({ item }: { item: string }) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.delete(
      `http://localhost:3000/liked-products/${item}`,
      { headers: { Authorization: `bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error, "Error Deleting Wishlist Product");
  }
}

export default wishlitDeleteRequest;
