import { Favorites } from "../types";

export async function toggleFavorite(
  id: number,
  favorites: Favorites,
  setFavorites: React.Dispatch<React.SetStateAction<Favorites>>
) {
  return new Promise<boolean>(function fulfilPromise(resolve) {
    setTimeout(function runToggleFavorite() {
      const isAlreadyFavorite = favorites.includes(id);
      if (isAlreadyFavorite) {
        setFavorites(favorites.filter((item) => item !== id));
      } else {
        setFavorites((prev) => [...prev, id]);
      }
    }, 500);
  });
}
