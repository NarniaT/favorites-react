import React, { useContext, useEffect } from "react";
import ProductItem from "./ProductItem";
import { Product, Favorites } from "../types";
import { FavsContext } from "../contexts/FavsProvider";
import { getFavorites } from "../fetchers/FavoritesFetcher";

type Props = {
  favoritesOnly?: boolean;
  products: Array<Product>;
};

export default function ProductList({
  favoritesOnly = false,
  products,
}: Props) {
  let filteredProducts = products;
  const { favorites, setFavorites } = useContext(FavsContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = (await getFavorites()) as Favorites;
      setFavorites(res);
    };
    fetchFavorites();
  }, []);

  if (favoritesOnly) {
    filteredProducts = products.filter(function isFavorite(p) {
      return favorites.includes(p.id);
    });
  }

  return (
    <div>
      {filteredProducts.map(function renderProductItem(p) {
        return <ProductItem data={p} key={p.id} />;
      })}
    </div>
  );
}
