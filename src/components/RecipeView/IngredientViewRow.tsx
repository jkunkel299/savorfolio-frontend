import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { useState } from "react";

interface IngredientViewRowProps {
    ingredientName: string;
    quantity: string;
    unitName: string;
    qualifier?: string | null
}

export default function IngredientViewRow ({
    ingredientName,
    quantity,
    unitName,
    qualifier,
}: IngredientViewRowProps) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    
    const contentWithQuantity = (
        <>
            <span>{quantity} </span>
            <span>{unitName} </span>
            <span>{ingredientName}</span>
            { qualifier && (
                <span> ({qualifier})</span>
            )}
        </>
    )

    const contentWithoutQuantity = (
        <>
            <span>{ingredientName} </span>
            <span>{unitName} </span>
            {qualifier && (
                <span> ({qualifier})</span>
            )}
        </>
    )

    return (
        <FormGroup>
            <FormControlLabel control={
                <Checkbox 
                    checked={checked}
                    onChange={handleChange}
                />
            } 
            label={ checked ? (
                <s>
                    {quantity ? (
                        contentWithQuantity
                    ) : (
                        contentWithoutQuantity
                    )}
                </s>
            ) : (
                <>
                    {quantity ? (
                        contentWithQuantity
                    ) : (
                        contentWithoutQuantity
                    )}
                </>
            )
            }/>
        </FormGroup>
    )
}