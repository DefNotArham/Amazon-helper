import ProductPage from "./pages/ProductPage";
import NoProductPage from "./pages/NoProductPage";
import { useEffect, useState } from "react";

type productMessage = {
  type: string;
  data: {
    isProduct: boolean;
    asin: string;
  };
};

function App() {
  const [product, setProduct] = useState<{ isProduct: boolean; asin: string }>({
    isProduct: false,
    asin: "",
  });

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: productMessage) => {
      if (message.type === "PRODUCT_DETECTED") {
        setProduct(message.data);
      }
    });
  }, []);

  return product.isProduct ? <ProductPage /> : <NoProductPage />;
}

export default App;
