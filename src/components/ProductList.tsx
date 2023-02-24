import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "../types";
import { useQuery } from "react-query";
import { getFavorites } from "../fake-fetchers/FavoritesFetcher";

type Props = {
  favoritesOnly?: boolean;
  products: Array<Product>;
};

export default function ProductList({
  favoritesOnly = false,
  products,
}: Props) {
  let filteredProducts = products;
  const { data: favorites } = useQuery<Product["id"][], Error>(
    "favorites",
    getFavorites
  );

  if (favoritesOnly) {
    filteredProducts = products.filter(function isFavorite(p) {
      return favorites!.includes(p.id);
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
