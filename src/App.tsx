import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import { AddRecipePage } from "./pages/AddRecipePage";
import HomePage from "./pages/HomePage";
import RecipeConfirmedPage from "./pages/RecipeConfirmedPage";
import { ViewRecipePage } from "./pages/ViewRecipePage";
import { ChooseInputPage } from "./pages/ChooseInputPage";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "./themes/theme";


const App: React.FC = () => {
  return ( 
    <>
    <GlobalStyles
        styles={{
            html: {
                boxSizing: 'border-box',
                WebkitFontSmoothing: 'antialiased',
            },
            '*, *::before, *::after': {
                boxSizing: 'inherit',
            },
            body: {
                margin: 0,
                padding: 0,
                backgroundColor: '#FAF8F6',
                color: '#333333',
            },
            a: {
                textDecoration: 'none',
                color: 'inherit',
            },
            img: {
                display: 'block',
                maxWidth: '100%',
            },
        }}
    />
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
    </>
    
  );

}

export default App;
