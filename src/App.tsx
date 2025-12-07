import { GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "./themes/theme";
import AppRouter from "./router/AppRouter";
import { useEffect } from "react";
import { fetchCurrentUser } from "./react-redux/slices/authSlice";
import { useAppDispatch } from "./react-redux/hooks";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <GlobalStyles
        styles={{
          html: {
            boxSizing: "border-box",
            WebkitFontSmoothing: "antialiased",
          },
          "*, *::before, *::after": {
            boxSizing: "inherit",
          },
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: "#FAF8F6",
            color: "#333333",
          },
          a: {
            textDecoration: "none",
            color: "inherit",
          },
          img: {
            display: "block",
            maxWidth: "100%",
          },
        }}
      />
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </>
  );
};

export default App;
