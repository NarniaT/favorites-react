import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import useProducts from "./fake-fetchers/ProductsFetcher";
import { Product } from "./types";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);

  useEffect(function useEffectCallback() {
    async function fetchProducts() {
      const products = await useProducts();
      setProducts(products);
    }

    fetchProducts();
  }, []);

  function toggleFavoritesOnly(e: React.ChangeEvent<HTMLInputElement>) {
    setFavoritesOnly((prev) => e.target.checked);
  }

  return (
    <div className="App">
      <div>
        <label htmlFor="favoritesOnly">Favorites </label>
        <input
          type="checkbox"
          id="favoritesOnly"
          onChange={toggleFavoritesOnly}
          checked={favoritesOnly}
        />
      </div>
      <ProductList
        products={products}
        favoritesOnly={favoritesOnly}
      ></ProductList>
    </div>
  );
}

export default App;
