import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import RecipeSearchPage from "./pages/RecipeSearchPage";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><RecipeSearchPage /></Layout>} />
        {/* <Route path="/add" element={<Layout><AddRecipePage /></Layout>} /> */}
      </Routes>
    </Router>
  );

}

export default App;
