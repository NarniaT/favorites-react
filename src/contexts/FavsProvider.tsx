import { createContext, useEffect, useState } from "react";
import { Favorites, FavoriteContext, Product } from "../types";

const FavsContext = createContext<FavoriteContext>({} as FavoriteContext);

export default function FavsProvider({ children }: { children: JSX.Element }) {
  const [favorites, setFavorites] = useState<Favorites>([]);

  return (
    <FavsContext.Provider
      value={{
        favorites,
        setFavorites,
      }}
    >
      {children}
    </FavsContext.Provider>
  );
}

export { FavsContext };
