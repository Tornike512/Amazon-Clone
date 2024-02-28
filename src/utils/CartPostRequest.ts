import axios from "axios";

async function cartPostRequest(productId: string, token: string | null) {
  try {
    const response = await axios.post(
      `http://localhost:3000/cart`,
      {
        product_id: productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error Adding Product To Cart", error);
  }
}

export default cartPostRequest;
