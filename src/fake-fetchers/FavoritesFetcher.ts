import { Favorites } from "../types";
import { Product } from "../types";

let favorites: Favorites = [];

export function getFavorites() {
  return new Promise<Product["id"][]>((resolve) => {
    setTimeout(() => respond(), 500);

    function respond() {
      resolve(favorites);
    }
  });
}

export async function toggleFavorite(id: Product["id"]) {
  return new Promise<boolean>(function fulfilPromise(resolve) {
    setTimeout(() => runToggleFavorite(id), 500);

    function runToggleFavorite(id: number) {
      const idx = favorites.findIndex((favId) => favId === id);
      const isAlreadyFavorite = idx !== -1;
      if (isAlreadyFavorite) {
        favorites = favorites.filter((favId) => favId !== id);
        resolve(false); // i.e., is no more favorite.
      } else {
        favorites = [...favorites, id];
        resolve(true);
      }
    }
  });
}
