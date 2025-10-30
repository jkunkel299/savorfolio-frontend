import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface InstructionViewRowProps {
    stepNumber: number;
    instructionText: string;
}

export default function InstructionViewRow ({
    stepNumber,
    instructionText,
}: InstructionViewRowProps) {
    return (
        <Grid container>
            <Grid size={{xs: 0.25}}>
                <Typography>{stepNumber}. </Typography>
            </Grid>
            <Grid size={{xs: 11.75}}>
                <Typography>{instructionText}</Typography>
            </Grid>
        </Grid>
    )
}