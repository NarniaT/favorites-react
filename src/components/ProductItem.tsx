import React from "react";
import useFavorites from "../hooks/useFavorites";
import { Product } from "../types";

type Props = {
  data: Product;
};

const ProductItem = ({ data }: Props) => {
  const { favorites, toggleFavorite, isLoading } = useFavorites();

  return (
    <div>
      {data.name} - <label htmlFor="toggleFavorite">♥ </label>{" "}
      <input
        type="checkbox"
        id="toggleFavorite"
        onChange={() => toggleFavorite(data.id)}
        checked={isLoading ? false : favorites!.includes(data.id)}
      />
    </div>
  );
};

export default ProductItem;
