import axios from "axios";
import { useEffect, useState } from "react";

interface TCategories {
  id: string;
  created_at?: string;
  updated_at: string;
  name: string;
}

export function Home() {
  const [categories, setCategories] = useState<TCategories[]>([]);

  async function getCategories() {
    try {
      const response = await axios.get(
        "http://localhost:3000/product-category/many"
      );
      setCategories(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      {categories.map((category) => {
        return <div key={category.id}>{category.name}</div>;
      })}
    </div>
  );
}
