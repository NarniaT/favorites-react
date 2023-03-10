export type Product = {
  id: number;
  name: string;
};

export type Favorites = Array<Product["id"]>;

export type FavoriteContext = {
  favorites: Favorites;
  toggleFavorite: (id: number) => void;
};
