import { Controller, useFormContext } from "react-hook-form";
import type { NewRecipeDTO } from "../../types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InstructionsList from "./InstructionsList";
import { useEffect } from "react";

export default function InstructionsForm() {
    const { control } = useFormContext<NewRecipeDTO>();
    const { register } = useFormContext<NewRecipeDTO>();

    useEffect(() => {
        register("Instructions",{
            validate: (value) => value.length > 0 || "You must add at least one instruction.",
        });
    }, [register]);

    return (
        <Box width="500">
            <Typography variant='h4' gutterBottom>Instructions List</Typography>
            <Controller 
                {...register("Instructions", { required: "Add at least one instruction." })}
                // name="Instructions"
                control={control}
                // rules={{ required: "Add an instruction."}}
                render={({ field }) => (
                    <InstructionsList onInstructionsChange={field.onChange} />
                )}
            />
        </Box>
        
    )
}