import ProductPage from "./pages/ProductPage";
import NoProductPage from "./pages/NoProductPage";

function App() {
  // For now, we'll pretend we're on a product page
  const isProductPage = false;

  return isProductPage ? <ProductPage /> : <NoProductPage />;
}

export default App;
