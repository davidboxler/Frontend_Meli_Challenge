import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import ProductListView from "./pages/ProductListView";
import ProductView from "./pages/ProductView";
import Error from "./pages/Error_404";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items/:id" element={<ProductView />} />
        <Route path="/items" element={<ProductListView />} />
        <Route path="/error_404" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;