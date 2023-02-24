import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "../types";
import useFavorites from "../hooks/useFavorites";

type Props = {
  favoritesOnly?: boolean;
  products: Array<Product>;
};

export default function ProductList({
  favoritesOnly = false,
  products,
}: Props) {
  let filteredProducts = products;
  const { favorites } = useFavorites();

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
