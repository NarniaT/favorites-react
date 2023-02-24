import { createContext, useEffect, useState } from "react";
import { Favorites, FavoriteContext, Product } from "../types";
import { getFavorites } from "../fetchers/FavoritesFetcher";

const FavsContext = createContext<FavoriteContext>({} as FavoriteContext);

export default function FavsProvider({ children }: { children: JSX.Element }) {
  const [favorites, setFavorites] = useState<Favorites>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = (await getFavorites()) as Favorites;
      setFavorites(res);
    };
    fetchFavorites();
  }, []);

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
