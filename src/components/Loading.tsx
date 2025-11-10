import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Loading(){
    return (
        <Stack
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(212, 119, 76, 0.7)" // Semi-transparent overlay
            zIndex={1}
        >
        <CircularProgress />
        <Typography variant="h6" mt={2}>Loading data...</Typography>
        </Stack>
    )
}