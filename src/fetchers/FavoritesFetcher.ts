import { Favorites } from "../types";

const favorites: Favorites = [];

export function getFavorites() {
  return new Promise((resolve) => {
    setTimeout(() => respond(resolve), 500);

    function respond(resolve: (value: unknown) => void) {
      resolve(favorites);
    }
  });
}

export async function toggleFavorite(id: number) {
  return new Promise<boolean>(function fulfilPromise(resolve) {
    setTimeout(() => runToggleFavorite(id), 500);

    function runToggleFavorite(id: number) {
      const idx = favorites.findIndex((favId) => favId === id);
      const isAlreadyFavorite = idx !== -1;
      if (isAlreadyFavorite) {
        favorites.splice(idx, 1);
        resolve(false); // i.e., is no more favorite.
      } else {
        favorites.push(id);
        resolve(true);
      }
    }
  });
}
