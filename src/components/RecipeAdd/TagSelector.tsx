import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import tagsService from "../../api/tagsApi";
import type { NewRecipeDTO } from "../../types";

type SelectorType = "Meal" | "Recipe_type" | "Cuisine" | "Dietary";

interface TagSelectorProps {
    type: SelectorType;
    label: string;
    multiple?: boolean;
}

export default function TagSelector({
    type,
    label,
    multiple = true,
}: TagSelectorProps) {
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const { control } = useFormContext<NewRecipeDTO>();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                let response;
                switch (type) {
                    case "Meal":
                        response = await tagsService.getMealTags();
                        break;
                    case "Recipe_type":
                        response = await tagsService.getRecipeTypeTags();
                        break;
                    case "Cuisine":
                        response = await tagsService.getCuisineTags();
                        break;
                    case "Dietary":
                        response = await tagsService.getDietaryTags();
                        break;
                    default:
                        throw new Error("Unknown tag type");
                }
                setOptions(response.data);
            } catch (err) {
                console.error(`Failed to fetch ${type} tags`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, [type]);

    if (loading) return <Typography>Loading {label}...</Typography>

    return (
        <Controller 
            name={`RecipeTags.${type}` as const}
            control={control}
            rules={{
                required:
                    type === "Recipe_type"
                    ? "Recipe type is required"
                    : false
            }}
            render={({ field }) => (
                <FormGroup>
                    <FormLabel>{label}</FormLabel>
                    {multiple ? (
                        // Multi-select (Checkbox)
                        options.map((tag) => (
                        <FormControlLabel
                            key={tag}
                            control={
                                <Checkbox
                                    checked={field.value?.includes(tag) || false}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        if (Array.isArray(field.value)) {
                                            // Multiple selection case
                                            const newValue = checked
                                                ? [...field.value, tag]
                                                : field.value.filter((v) => v !== tag);
                                            field.onChange(newValue);
                                        } else {
                                            // Single selection case — treat it as a single string
                                            field.onChange(checked ? [tag] : []);
                                        }
                                    }}
                                    
                                />
                            }
                            label={tag}
                        />
                        ))
                    ) : (
                        // Single-select (RadioGroup)
                        <RadioGroup
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        >
                        {options.map((tag) => (
                            <FormControlLabel
                                key={tag}
                                value={tag}
                                control={<Radio />}
                                label={tag}
                            />
                        ))}
                        </RadioGroup>
                    )}
                </FormGroup>
            )}
        />
    )
}