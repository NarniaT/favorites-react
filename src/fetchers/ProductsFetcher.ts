import { Product } from "../types";

export default function useProducts() {
  return new Promise<Product[]>(function fetchProducts(resolve) {
    setTimeout(function initiateFetchProducts() {
      let products: Product[] = [
        {
          id: 1,
          name: "test product 1",
        },
        {
          id: 2,
          name: "test product 2",
        },
        {
          id: 3,
          name: "test product 3",
        },
      ];
      resolve(products);
    }, 1000);
  });
}
