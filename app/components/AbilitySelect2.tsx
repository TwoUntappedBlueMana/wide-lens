import { Select, MenuItem, SelectChangeEvent, Box, Menu } from "@mui/material";
import { useEffect, useState } from "react";
import { toTitleCase } from "@/app/utils/utils";
import { AbilityName, SpeciesAbility } from "@pkmn/dex-types";

export function AbilitySelect2({ abilities }: { abilities: SpeciesAbility }) {
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
