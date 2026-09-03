import ProductPage from "./pages/ProductPage";
import NoProductPage from "./pages/NoProductPage";
import { useEffect, useState } from "react";

import type { Product } from "./types/product-type";

function App() {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;

      if (!tabId) return;

      chrome.tabs.sendMessage(
        tabId,
        { type: "GET_PRODUCT" },
        (response: Product | undefined) => {
          if (response) {
            setProduct(response);
          }
        },
      );
    });
  }, []);

  if (!product) return <NoProductPage />;

  return <ProductPage product={product} />;
}

export default App;
