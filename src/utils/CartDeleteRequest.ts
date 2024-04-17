import axios from "axios";

async function cartDeleteRequest({
  cartProductId,
  token,
}: {
  cartProductId: string;
  token: string | null;
}) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/cart/${cartProductId}?removeAll=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Couldn't Remove The Product", error);
  }
}

export default cartDeleteRequest;
