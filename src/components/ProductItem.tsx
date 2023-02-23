import React, { useContext } from "react";
import { Product } from "../types";
import { FavsContext } from "../contexts/FavsProvider";
import { toggleFavorite } from "../fetchers/FavoritesFetcher";

type Props = {
  data: Product;
};

const ProductItem = ({ data }: Props) => {
  const { favorites, setFavorites } = useContext(FavsContext);

  async function runToggleFavorite() {
    const isFav = await toggleFavorite(data.id);
    if (!isFav) {
      setFavorites((prevFavIds) =>
        prevFavIds.filter((pfid) => pfid !== data.id)
      );
    } else {
      setFavorites((prevFavIds) => [...prevFavIds, data.id]);
    }
  }

  return (
    <div>
      {data.name} - <label htmlFor="toggleFavorite">♥ </label>{" "}
      <input
        type="checkbox"
        id="toggleFavorite"
        onChange={runToggleFavorite}
        checked={favorites.includes(data.id)}
      />
    </div>
  );
};

export default ProductItem;
