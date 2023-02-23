import React, { useContext } from "react";
import { Product } from "../types";
import { FavsContext } from "../contexts/FavsProvider";

type Props = {
  data: Product;
};

const ProductItem = ({ data }: Props) => {
  const { favorites, toggleFavorite } = useContext(FavsContext);

  function doToggleFavorite(productId: Product["id"]) {
    toggleFavorite(productId);
  }

  return (
    <div>
      {data.name} - <label htmlFor="toggleFavorite">♥ </label>{" "}
      <input
        type="checkbox"
        id="toggleFavorite"
        onChange={function runToggleFavorite() {
          doToggleFavorite(data.id);
        }}
        checked={favorites.includes(data.id)}
      />
    </div>
  );
};

export default ProductItem;
