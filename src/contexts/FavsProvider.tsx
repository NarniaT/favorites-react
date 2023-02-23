import { createContext, useEffect, useState } from "react";
import { Favorites, FavoriteContext, Product } from "../types";
import { toggleFavorite as _toggleFavorite } from "../fetchers/FavoritesFetcher";

const FavsContext = createContext<FavoriteContext>({} as FavoriteContext);

export default function FavsProvider({ children }: { children: JSX.Element }) {
  const [favorites, setFavorites] = useState<Favorites>([]);

  async function toggleFavorite(pid: Product["id"]) {
    await _toggleFavorite(pid, favorites, setFavorites);
  }

  return (
    <FavsContext.Provider
      value={{
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavsContext.Provider>
  );
}

export { FavsContext };
