import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import { AddRecipePage } from "./pages/AddRecipePage";
import HomePage from "./pages/HomePage";
import RecipeConfirmedPage from "./pages/RecipeConfirmedPage";
import { ViewRecipePage } from "./pages/ViewRecipePage";
import { ChooseInputPage } from "./pages/ChooseInputPage";


const App: React.FC = () => {
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/search" element={<Layout><RecipeSearchPage /></Layout>} />
        <Route path="/add-input" element={<Layout><ChooseInputPage /></Layout>} />
        <Route path="/add" element={<Layout><AddRecipePage /></Layout>} />
        <Route path="/confirmed" element={<Layout><RecipeConfirmedPage /></Layout>} />
        <Route path="/view" element={<Layout><ViewRecipePage /></Layout>} />
      </Routes>
    </Router>
  );

}

export default App;
