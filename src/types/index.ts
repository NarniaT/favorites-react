export type Product = {
  id: number;
  name: string;
};

export type Favorites = Array<Product["id"]>;

export type FavoriteContext = {
  favorites: Favorites;
  setFavorites: React.Dispatch<React.SetStateAction<Favorites>>;
};
