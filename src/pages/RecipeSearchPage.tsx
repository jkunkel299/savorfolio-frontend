import { Box } from "@mui/material";
import SidebarFilters from "../components/SidebarFilters";
import RecipeList from "../components/RecipeList";

export default function RecipeSearchPage() {
    return (
        <>
            {/* Sidebar */}
            <Box
                sx={{
                    width: 250,
                    flexShrink: 0,
                    bgcolor: "background.paper",
                    borderRight: "1px solid",
                    borderColor: "divider",
                }}
            >
                <SidebarFilters />
            </Box>
            {/* Main content */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    p: 2,
                }}
            >
                <RecipeList />
            </Box>
        </>
    );
}