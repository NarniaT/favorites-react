import { createContext, useEffect, useState } from "react";
import { Favorites, FavoriteContext, Product } from "../types";
import {
  getFavorites,
  toggleFavorite as _toggleFavorite,
} from "../fetchers/FavoritesFetcher";

const FavsContext = createContext<FavoriteContext>({} as FavoriteContext);

export default function FavsProvider({ children }: { children: JSX.Element }) {
  const [favorites, setFavorites] = useState<Favorites>([]);

  const fetchFavorites = async () => {
    const res = (await getFavorites()) as Favorites;
    setFavorites((prev) => res);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function toggleFavorite(id: Product["id"]) {
    await _toggleFavorite(id);
    await fetchFavorites();
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
