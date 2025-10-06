import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import { AddRecipePage } from "./pages/AddRecipePage";
import HomePage from "./pages/HomePage";
import RecipeConfirmedPage from "./pages/RecipeConfirmedPage";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/search" element={<Layout><RecipeSearchPage /></Layout>} />
        <Route path="/add" element={<Layout><AddRecipePage /></Layout>} />
        <Route path="/confirmed" element={<Layout><RecipeConfirmedPage /></Layout>} />
      </Routes>
    </Router>
  );

}

export default App;
