import ProductPage from "./pages/ProductPage";
import NoProductPage from "./pages/NoProductPage";

function App() {
  const test = true;
  return test ? <ProductPage /> : <NoProductPage />;
}

export default App;
