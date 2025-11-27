import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";

import { colors } from "../../themes/colors";
import NavList from "./NavList";

export default function Header() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileSidebar = () => setMobileOpen((prev) => !prev);

  return (
    <AppBar position="fixed" sx={{ width: "100%", left: 0 }}>
      <Toolbar disableGutters>
        <IconButton color="secondary" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        <Typography
          variant="h2"
          color={colors.textPrimary}
          component={"div"}
          sx={{ flexGrow: 1, pl: 2 }}
        >
          Savorfolio
        </Typography>
        {isDesktop ? (
          // Desktop Navigation (Buttons)
          <NavList />
        ) : (
          // Mobile Navigation (Hamburger Icon)
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleMobileSidebar}
            sx={{ display: { xs: "block", sm: "none" } }} // Ensure icon shows only on mobile
          >
            <MenuIcon color="secondary" />
          </IconButton>
        )}
      </Toolbar>

      {/* Drawer component for mobile menu */}
      <Drawer
        anchor="right" // Drawer slides in from the right
        open={mobileOpen}
        onClose={toggleMobileSidebar}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleMobileSidebar}
          onKeyDown={toggleMobileSidebar}
        >
          <Stack>
            <NavList />
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
}
