import { createContext, useEffect, useState } from "react";
import { Favorites, FavoriteContext, Product } from "../types";
import {
  getFavorites,
  toggleFavorite as _toggleFavorite,
} from "../fetchers/FavoritesFetcher";

const FavsContext = createContext<FavoriteContext>({} as FavoriteContext);

export default function FavsProvider({ children }: { children: JSX.Element }) {
  const [favorites, setFavorites] = useState<Favorites>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = (await getFavorites()) as Favorites;
      setFavorites((prev) => res);
    };
    fetchFavorites();
  }, []);

  async function toggleFavorite(id: Product["id"]) {
    const isFav = await _toggleFavorite(id);
    if (!isFav) {
      setFavorites((prevFavIds) => prevFavIds.filter((pfid) => pfid !== id));
    } else {
      setFavorites((prevFavIds) => [...prevFavIds, id]);
    }
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
