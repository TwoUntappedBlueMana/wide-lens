import { Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import { useState } from "react";
import { SpeciesAbility } from "@pkmn/dex-types";

export function AbilitySelect({ abilities }: { abilities: SpeciesAbility }) {
    const [currentAbilityName, setCurrentAbility] = useState<string>(
        abilities[0]
    );

    function handleChange(event: SelectChangeEvent) {
        setCurrentAbility(event.target.value);
    }

    return (
        <Box>
            <Select value={currentAbilityName} onChange={handleChange}>
                {Object.values(abilities).map((ability) => {
                    return (
                        <MenuItem key={ability} value={ability}>
                            {ability}
                        </MenuItem>
                    );
                })}
            </Select>
        </Box>
    );
}
