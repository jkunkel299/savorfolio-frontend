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
        <>
            <Typography>{stepNumber}. {instructionText}</Typography>
        </>
    )
}