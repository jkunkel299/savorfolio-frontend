import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface InstructionViewRowProps {
  stepNumber: number;
  instructionText: string;
}

export default function InstructionViewRow({
  stepNumber,
  instructionText,
}: InstructionViewRowProps) {
  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ width: "fit-content" }}>
        <Typography>{stepNumber}. </Typography>
      </Box>
      <Box>
        <Typography>{instructionText}</Typography>
      </Box>
    </Stack>
  );
}
