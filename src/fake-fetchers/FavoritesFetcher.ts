import { Favorites, Product } from "../types";

let favorites: Favorites = [];

export function getFavorites() {
  return new Promise<Product["id"][]>((resolve) => {
    // This timeout has to be larger than the one used in toggleFavorite, or else the optimistic update may show the initial state again for a short period of time in some circumstances.
    setTimeout(() => respond(), 700);

    function respond() {
      resolve(favorites);
    }
  });
}

export async function toggleFavorite({ id }: { id: Product["id"] }) {
  return new Promise<boolean>(function fulfilPromise(resolve, reject) {
    setTimeout(() => runToggleFavorite(id), 500);

    function runToggleFavorite(id: number) {
      console.log(`toggled id ${id}`);
      if (id === 2) {
        // Manual testing of "failing optimistic updates".
        reject("favoriting failed");
        return;
      }
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
