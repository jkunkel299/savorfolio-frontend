import { GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "./themes/theme";
import AppRouter from "./router/AppRouter";
import { hydrateFromLocalStorage } from "./react-redux/slices/authSlice";
import { store } from "./react-redux/store";

const App: React.FC = () => {
  store.dispatch(hydrateFromLocalStorage());

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
