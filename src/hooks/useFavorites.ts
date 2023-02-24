import { useQueryClient, useQuery, useMutation } from "react-query";
import {
  getFavorites,
  toggleFavorite as _toggleFavorite,
} from "../fake-fetchers/FavoritesFetcher";
import { Product } from "../types";

export default function useFavorites() {
  const { data: favorites } = useQuery<Product["id"][], Error>(
    "favorites",
    getFavorites
  );

  const queryClient = useQueryClient();
  const { mutate: toggleFavorite } = useMutation(_toggleFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries("favorites");
    },
  });

  return { favorites, toggleFavorite };
}
