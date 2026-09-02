import ProductPage from "./pages/ProductPage";
import NoProductPage from "./pages/NoProductPage";
import { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState<{ isProduct: boolean; asin: string }>({
    isProduct: false,
    asin: "",
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;

      if (!tabId) return;

      chrome.tabs.sendMessage(tabId, { type: "GET_PRODUCT" }, (response) => {
        if (response) setProduct(response);
      });
    });
  }, []);

  return product.isProduct ? <ProductPage /> : <NoProductPage />;
}

export default App;
