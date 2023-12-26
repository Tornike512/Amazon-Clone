import { GlobalContext } from "@src/providers/GlobalProvider";
import { useContext } from "react";

export function Home() {
  const { count, setCount } = useContext(GlobalContext);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}> {count}</button>
    </div>
  );
}
