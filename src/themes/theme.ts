import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

const theme = createTheme({
  typography: {
    fontFamily: '"Aptos", "Segoe UI", "Helvetica Neue", Arial, sans-serif',

    // Heading styles use Bookman Old Style for that elegant serif feel
    h1: {
      fontFamily: '"Bookman Old Style", Bookman, serif',
      fontWeight: 700,
      fontSize: "2.75rem",
      lineHeight: 1.2,
      color: "#2B2B2B",
    },
    h2: {
      fontFamily: '"Bookman Old Style", Bookman, serif',
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.3,
      color: "#2B2B2B",
    },
    h3: {
      fontFamily: '"Bookman Old Style", Bookman, serif',
      fontWeight: 700,
      fontSize: "1.75rem",
      lineHeight: 1.35,
      color: "#2B2B2B",
    },
    h4: {
      fontFamily: '"Bookman Old Style", Bookman, serif',
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      color: "#2B2B2B",
    },
    h5: {
      fontFamily: '"Bookman Old Style", Bookman, serif',
      fontWeight: 700,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      color: "#2B2B2B",
    },
    h6: {
      fontFamily: '"Bookman Old Style", Bookman, serif',
      fontWeight: 700,
      fontSize: "1.1rem",
      lineHeight: 1.4,
      color: "#2B2B2B",
    },

    // Body text in Nunito Sans (clean, modern, very readable)
    body1: {
      fontFamily: '"Aptos", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#333333",
    },
    body2: {
      fontFamily: '"Aptos", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: "0.9375rem",
      lineHeight: 1.65,
      color: "#555555",
    },

    button: {
      fontFamily: '"Aptos", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontWeight: 600,
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: colors.primaryAccent, // a warm reddish-brown accent
      light: colors.primaryAccentLight,
      dark: colors.primaryAccentDark,
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.textPrimary, // muted dark brown/grey
      light: "#8A736C",
      dark: "#4A3C38",
      contrastText: "#ffffff",
    },
    background: {
      default: colors.warmBackground, // very light warm-off-white
      paper: colors.paperWhite,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: colors.textPrimary,
        },
      },
    },
  },
});

export default theme;
