import { PropsWithChildren } from "react";
import { ResponsiveContext } from ".";
import { useState } from "react";

export function ResponsiveProvider({ children }: PropsWithChildren) {
  const [responsive587Px, setResponsive587Px] = useState<boolean>(false);

  return (
    <ResponsiveContext.Provider value={{ responsive587Px, setResponsive587Px }}>
      {children}
    </ResponsiveContext.Provider>
  );
}
