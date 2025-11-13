import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import RecipeSearchPage from "../pages/RecipeSearchPage";
import { AddRecipePage } from "../pages/AddRecipePage";
import HomePage from "../pages/HomePage";
import RecipeConfirmedPage from "../pages/RecipeConfirmedPage";
import { ViewRecipePage } from "../pages/ViewRecipePage";
import { ChooseInputPage } from "../pages/ChooseInputPage";
import LoginPage from "../pages/LoginPage";
import { PrivateRoute } from "./PrivateRoute";

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <RecipeSearchPage />
          </Layout>
        }
      />
      <Route
        path="/add-input"
        element={
          <PrivateRoute>
            <Layout>
              <ChooseInputPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/add"
        element={
          <PrivateRoute>
            <Layout>
              <AddRecipePage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/confirmed"
        element={
          <PrivateRoute>
            <Layout>
              <RecipeConfirmedPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/view"
        element={
          <Layout>
            <ViewRecipePage />
          </Layout>
        }
      />
      <Route
        path="/auth/login"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;
