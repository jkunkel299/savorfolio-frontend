import type { ReactNode } from 'react';
import Header from './Header';
import { Box, Toolbar } from '@mui/material';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Toolbar />
            <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;