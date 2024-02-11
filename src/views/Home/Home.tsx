import { useState } from "react";

import beautyProducts from "@src/assets/beauty-products.jpg";
import essentialsForGamers from "@src/assets/essentials-for-gamers.jpg";
import kitchenFavorites from "@src/assets/kitchen-favorites.jpg";
import newArrivals from "@src/assets/new-arrivals.jpg";
import shopBooks from "@src/assets/shop-books.jpg";

import "Home.scss";

export function Home() {
  const [backgroundChange, setBackgroundChange] = useState<number>(0);

  function changeBackgroundImage(direction: string) {
    if (direction === "left") {
      setBackgroundChange((prev) => (prev === 0 ? 4 : prev - 1));
    } else {
      setBackgroundChange((prev) => (prev === 4 ? 0 : prev + 1));
    }
  }

  function renderBackgroundImage() {
    switch (backgroundChange) {
      case 0:
        return essentialsForGamers;
      case 1:
        return newArrivals;
      case 2:
        return beautyProducts;
      case 3:
        return kitchenFavorites;
      case 4:
        return shopBooks;
      default:
        return essentialsForGamers;
    }
  }

  return (
    <div className="home">
      <img
        className="home-background-image"
        src={renderBackgroundImage()}
        alt="Home Background Image"
      />
      <button onClick={() => changeBackgroundImage("left")}>left</button>
      <button onClick={() => changeBackgroundImage("right")}>right</button>
    </div>
  );
}
