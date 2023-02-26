import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  getFavorites,
  toggleFavorite as __toggleFavorite,
} from "../fake-fetchers/FavoritesFetcher";
import { Product } from "../types";

export default function useFavorites() {
  const {
    data: favorites,
    isLoading,
    isError: isRequestError,
  } = useQuery<Product["id"][], Error>(["favorites"], getFavorites);

  function toggleFavInCache(id: Product["id"], isFavAlready?: boolean) {
    const _isFavAlready = isFavAlready ?? favorites?.includes(id);
    queryClient.setQueryData<Product["id"][]>(["favorites"], (favs) => {
      if (_isFavAlready) {
        return favs!.filter((favId) => favId !== id);
      } else {
        return [...favs!, id];
      }
    });
    return _isFavAlready;
  }

  const queryClient = useQueryClient();
  const { mutate: _toggleFavorite, isError: isMutationError } = useMutation(
    __toggleFavorite,
    {
      onMutate: ({ id }) => {
        toggleFavInCache(id);
        // return () => {
        //   toggleFavInCache(id);
        // };
      },
      onSettled: () => {
        queryClient.invalidateQueries(["favorites"]);
      },
      onError: (error, { id }) => {
        toggleFavInCache(id);
      },
    }
  );

  // _toggleFavorite is a React Query mutateFn and MUST (preferrably) get an object as its argument, so this toggleFavorite is just a means of making the API simpler for the user, just pass the id directly, no need to wrap it in an object.
  const toggleFavorite = (id: Product["id"]) => _toggleFavorite({ id });

  return {
    favorites,
    toggleFavorite,
    isLoading,
    isRequestError,
    isMutationError,
  };
}
