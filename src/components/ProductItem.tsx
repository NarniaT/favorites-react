import React from "react";
import { Product } from "../types";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getFavorites,
  toggleFavorite as _toggleFavorite,
} from "../fake-fetchers/FavoritesFetcher";

type Props = {
  data: Product;
};

const ProductItem = ({ data }: Props) => {
  const { data: favorites } = useQuery<Product["id"][]>(
    "favorites",
    getFavorites
  );

  const queryClient = useQueryClient();
  const { mutate: toggleFavorite } = useMutation(_toggleFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries("favorites");
    },
  });

  return (
    <div>
      {data.name} - <label htmlFor="toggleFavorite">♥ </label>{" "}
      <input
        type="checkbox"
        id="toggleFavorite"
        onChange={() => toggleFavorite(data.id)}
        checked={favorites!.includes(data.id)}
      />
    </div>
  );
};

export default ProductItem;
