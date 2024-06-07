import { Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import Pokedex, { PokemonType } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { toTitleCase } from "@/app/utils/utils";
import { TypeChip } from "./DefensiveTypeChart";

export function TeraSelect({
    pokedex,
    types,
    allTypes
}: {
    pokedex: Pokedex;
    types: PokemonType[];
    allTypes: string[];
}) {
    const [currentTera, setCurrentTera] = useState<string>(types[0].type.name);
    const [typeChip, setTypeChip] = useState<string>(types[0].type.name);
    
    function handleChange(event: SelectChangeEvent) {
        setCurrentTera(event.target.value);
        setTypeChip(event.target.value);
    }

    useEffect(() => {
        
    }, [currentTera]);

    return (
        <Box>
            <TypeChip type={typeChip} />
            <Select value={currentTera} onChange={handleChange}>
                {allTypes?.map((type) => {
                    return (
                        <MenuItem
                            key={type}
                            value={type}
                            sx={{ bgcolor: `type.${typeChip}` }}
                        >
                            {toTitleCase(type)}
                        </MenuItem>
                    );
                })}
            </Select>
        </Box>
    );
}